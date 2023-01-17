import LeaseContractUseCases from '../../useCases/LeaseContractUseCases';
import { daysBetween, monthsBetween } from '../../utils/datesHelper';

const startMidnightDailyJob = async () => {
  const leaseContractUseCases = new LeaseContractUseCases();

  const leaseContracts = await leaseContractUseCases.list();
  const results: Promise<void>[] = [];

  for (const leaseContract of leaseContracts) /* eslint-disable-line*/ {
    const { startDate, nextDate, timeType, timeAmount } = leaseContract;
    const currentTime =
      timeType === 'monthly'
        ? monthsBetween(
            new Date(startDate),
            nextDate ? new Date(nextDate) : undefined
          )
        : daysBetween(
            new Date(startDate),
            nextDate ? new Date(nextDate) : undefined
          );

    if (currentTime < timeAmount)
      results.push(
        leaseContractUseCases.generateMonthlyRecurringTasks(leaseContract)
      );
  }
  await Promise.all(results);
  process.exit(0);
};

export default startMidnightDailyJob;
