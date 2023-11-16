import useSWR from "swr";
import {fetcher} from "@/api/common";
import {RewardRecord} from "@/type";

type RewardsHistoryRequest = {
    pageSize: number;
    page: number;
    sortField?: string;
    sortOrder?: string;
};

type RewardsHistoryData = {
    total: number;
    records: RewardRecord[];
};

export const useUserRewardsHistory = (props: RewardsHistoryRequest) => {
    const key = JSON.stringify(['/api/points/record/list/page/vo', props]);

    const {
        data,
        error,
    } = useSWR<RewardsHistoryData, Error>(
        key,
        () => fetcher<RewardsHistoryData>('/api/points/record/list/page/vo', 'POST', props),
    );

    return {
        data,
        isLoading: !error && !data,
        isError: error,
    };
};
