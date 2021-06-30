import axios, { AxiosResponse } from "axios";
import { Eventing } from "./Eventing";

/**
 * Generics
 * - Type of collection
 * - Type of props (specifies the type of JSON data we get back)
 * 
 * deserialize: a function that takes JSON data and returns an instance of a model
 */
export class Collection<T, K> {
    models: T[] = [];
    events: Eventing = new Eventing();

    constructor(
        public rootUrl: string,
        public deserialize: (json: K) => T
    ) {}

    get on() {
        return this.events.on;
    }

    get trigger() {
        return this.events.trigger;
    }

    async fetch(): Promise<void> {
        const response: AxiosResponse = await axios.get(this.rootUrl);
        response.data.forEach((value: K) => {
            this.models.push(this.deserialize(value));
        });

        this.trigger('change');
    }
}