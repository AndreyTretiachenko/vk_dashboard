

    export interface Activity {
        comments: number;
        copies: number;
        hidden: number;
        likes: number;
        subscribed: number;
        unsubscribed: number;
    }

    export interface Age {
        value: string;
        count: number;
    }

    export interface City {
        count: number;
        name: string;
        value: number;
    }

    export interface Country {
        code: string;
        count: number;
        name: string;
        value: number;
    }

    export interface Sex {
        value: string;
        count: number;
    }

    export interface SexAge {
        value: string;
        count: number;
    }

    export interface Reach {
        age: Age[];
        cities: City[];
        countries: Country[];
        mobile_reach: number;
        reach: number;
        reach_subscribers: number;
        sex: Sex[];
        sex_age: SexAge[];
    }

    export interface Age2 {
        value: string;
        count: number;
    }

    export interface City2 {
        count: number;
        name: string;
        value: number;
    }

    export interface Country2 {
        code: string;
        count: number;
        name: string;
        value: number;
    }

    export interface Sex2 {
        value: string;
        count: number;
    }

    export interface SexAge2 {
        value: string;
        count: number;
    }

    export interface Visitors {
        age: Age2[];
        cities: City2[];
        countries: Country2[];
        mobile_views: number;
        sex: Sex2[];
        sex_age: SexAge2[];
        views: number;
        visitors: number;
    }

    export interface Response {
        activity: Activity;
        period_from: number;
        period_to: number;
        reach: Reach;
        visitors: Visitors;
    }

    export interface TstatsGroup {
        response: Response[];
        error: string,
        isLoading: boolean
    }


