import LeaseContractUseCases from "../../useCases/LeaseContractUseCases";
import { daysBetween, monthsBetween } from "../../utils/datesHelper";

import ILeaseContract from "../../domain/entities/ILeaseContract";
import { TIME_TYPE_MONTHLY_OPTION } from "../../domain/entities/TimeType";

const startMidnightDailyJob = async (): Promise<ILeaseContract[]> => {
  // docker exec main yarn run job
  const leaseContractUseCases = new LeaseContractUseCases();
  const leaseContracts = await leaseContractUseCases.listWorkInProgress();
  const results: ILeaseContract[] = [];

  await Promise.all(
    leaseContracts.map(async (leaseContract) => {
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

      if (currentTime < parseInt(timeAmount, 10)) {
        const generateEvents = true;
        const updatedContract =
          await leaseContractUseCases.generateMonthlyRecurringTasks(
            leaseContract,
            generateEvents
          );
        results.push(updatedContract);
      }
    })
  );
  return results;
};

export default startMidnightDailyJob;
