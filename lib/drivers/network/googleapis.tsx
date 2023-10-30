import { google } from 'googleapis';
import { Types } from 'mongoose';
import ILeaseContract from '../../domain/entities/ILeaseContract';
import ITask from '../../domain/entities/ITask';
import ITaskType from '../../domain/entities/ITaskType';
import TaskTypeUseCases from '../../useCases/TaskTypeUseCases';
import TaskUseCases, { LEASE } from '../../useCases/TaskUseCases';
import TenantUseCases from '../../useCases/TenantUseCases';
import UserUseCases from '../../useCases/UserUseCases';

const _getOauthClient = async () => {
  const user = await new UserUseCases().findByQuery({});
  const REDIRECT_URL = user.google_redirect_url;
  const CLIENT_ID = user.google_client_id;
  const CLIENT_SECRET = user.google_client_secret;
  if (!REDIRECT_URL || !CLIENT_ID || !CLIENT_SECRET) return null;

  return new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
};

export const generateGoogleUrlRedirect = async (
  leaseContractId: string
): Promise<string> => {
  const taskTypeUseCases = new TaskTypeUseCases();
  const taskType = (await taskTypeUseCases.findByQuery({
    name: LEASE
  })) as ITaskType;
  const taskUseCases = new TaskUseCases();
  const task = (await taskUseCases.findByQuery({
    leaseContract: leaseContractId,
    taskType: taskType._id?.toString()
  })) as ITask;

  if (task && task._id) {
    const oauth2Client = await _getOauthClient();
    if (!oauth2Client) return '';
    const scopes = ['https://www.googleapis.com/auth/calendar'];
    const user = await new UserUseCases().findByQuery({});
    oauth2Client.on('tokens', async (tokens) => {
      if (tokens.refresh_token) {
        user.google_tokens = tokens.refresh_token;
        const unknownUser = user as unknown;
        await new UserUseCases().update(unknownUser as Record<string, unknown>);
      }
    });
    return oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      state: task._id.toString()
    });
  }
  return '';
};

export const generateGoogleEvent = async (
  task: ITask,
  leaseContract: ILeaseContract,
  code?: string
): Promise<void> => {
  const oauth2Client = await _getOauthClient();
  if (!oauth2Client) return;
  const user = await new UserUseCases().findByQuery({});

  if (code) {
    // Newly Token - User interface path

    const response = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(response.tokens);
    await new UserUseCases().update({
      ...user,
      google_tokens: response.tokens
    });
  } else if (user.google_tokens) {
    // Background job path

    const { /* eslint-disable-line*/ google_tokens } = user;
    const { /* eslint-disable-line*/ refresh_token } = google_tokens;
    oauth2Client.setCredentials({
      refresh_token /* eslint-disable-line*/
    });
  } else {
    return;
  }

  const date = leaseContract.nextDate || leaseContract.startDate;
  const stringDate = date.toString();

  const attendees = [{ email: user.email }];
  const tenantId = leaseContract.tenant as Types.ObjectId;
  if (tenantId) {
    const tenantUseCases = new TenantUseCases();
    const tenant = await tenantUseCases.findById(tenantId.toString());
    if (tenant.email) attendees.push({ email: tenant.email });
  }

  const event = {
    summary: task.description,
    description: task.description,
    start: {
      dateTime: `${stringDate}T08:00:00-04:00`,
      timeZone: 'America/La_Paz'
    },
    end: {
      dateTime: `${stringDate}T09:00:00-04:00`,
      timeZone: 'America/La_Paz'
    },
    attendees,
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 10 }
      ]
    }
  };

  const API_KEY = user.google_api_key;
  const calendar = google.calendar({
    version: 'v3',
    auth: API_KEY
  });

  try {
    await calendar.events.insert({
      auth: oauth2Client,
      calendarId: 'primary',
      requestBody: event
    });
    /* eslint-disable-line*/ console.log('generated!');
  } catch (errorResponse) {
    /* eslint-disable-line*/ console.log('ERROR!!!!!');
    /* eslint-disable-line*/ console.log(errorResponse);
  }
};
