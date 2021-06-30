import { Model } from "./Model";
import { Attributes } from "./Attributes";
import { ApiSync } from "./ApiSync";
import { Eventing } from './Eventing';
import { Collection } from "./Collection";

export interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User extends Model<UserProps> {
    static createUser(attrs: UserProps): User {
        return new User(
            new Attributes<UserProps>(attrs),
            new Eventing(),
            new ApiSync<UserProps>(rootUrl)
        )
    }

    static createUserCollection(): Collection<User, UserProps> {
        return new Collection<User, UserProps>(
            'http://localhost:3000/users',
            (json: UserProps) => User.createUser(json)
        );
    }

    setRandomAge(): void {
        const age = Math.round(Math.random() * 100);
        this.set({ age: age });
    }
}