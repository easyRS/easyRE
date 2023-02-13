import LeaseContractUseCases from '../../useCases/LeaseContractUseCases';
import { daysBetween, monthsBetween } from '../../utils/datesHelper';

import { TIME_TYPE_MONTHLY_OPTION } from '../../domain/entities/TimeType';

const startMidnightDailyJob = async () => {
  const leaseContractUseCases = new LeaseContractUseCases();

  const leaseContracts = await leaseContractUseCases.listWorkInProgress();
  const results: Promise<void>[] = [];

  for (const leaseContract of leaseContracts) /* eslint-disable-line*/ {
    const { startDate, nextDate, timeType, timeAmount } = leaseContract;
    const currentTime =
      timeType === TIME_TYPE_MONTHLY_OPTION
        ? monthsBetween(
            new Date(startDate),
            nextDate ? new Date(nextDate) : undefined
          )
        : daysBetween(
            new Date(startDate),
            nextDate ? new Date(nextDate) : undefined
          );

    if (currentTime < timeAmount) {
      results.push(
        leaseContractUseCases.generateMonthlyRecurringTasks(leaseContract)
      );
    }
  }
  await Promise.all(results);
  process.exit(0);
};

export default startMidnightDailyJob;
