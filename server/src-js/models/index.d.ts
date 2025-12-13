import { Sequelize } from 'sequelize';
export declare const createModels: (sequelize: Sequelize) => {
    User: {
        new (values?: import("sequelize").Optional<import("sequelize").InferCreationAttributes<{
            id: number;
            username: string;
            email: string;
            password: string;
            role: "user" | "admin";
            status: "active" | "inactive";
            createdAt: Date;
            updatedAt: Date;
            comparePassword(candidatePassword: string): Promise<boolean>;
            _attributes: import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>;
            dataValues: import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>;
            _creationAttributes: import("sequelize").InferCreationAttributes</*elided*/ any, {
                omit: "id" | "createdAt" | "updatedAt" | "comparePassword";
            }>;
            isNewRecord: boolean;
            sequelize: Sequelize;
            where(): object;
            getDataValue<K extends "id" | "username" | "email" | "password" | "role" | "status" | "createdAt" | "updatedAt">(key: K): import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>[K];
            setDataValue<K extends "id" | "username" | "email" | "password" | "role" | "status" | "createdAt" | "updatedAt">(key: K, value: import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>[K]): void;
            get(options?: {
                plain?: boolean;
                clone?: boolean;
            }): import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>;
            get<K extends keyof /*elided*/ any>(key: K, options?: {
                plain?: boolean;
                clone?: boolean;
            }): /*elided*/ any[K];
            get(key: string, options?: {
                plain?: boolean;
                clone?: boolean;
            }): unknown;
            set<K extends "id" | "username" | "email" | "password" | "role" | "status" | "createdAt" | "updatedAt">(key: K, value: import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>[K], options?: import("sequelize").SetOptions): /*elided*/ any;
            set(keys: Partial<import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>>, options?: import("sequelize").SetOptions): /*elided*/ any;
            setAttributes<K extends "id" | "username" | "email" | "password" | "role" | "status" | "createdAt" | "updatedAt">(key: K, value: import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>[K], options?: import("sequelize").SetOptions): /*elided*/ any;
            setAttributes(keys: Partial<import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>>, options?: import("sequelize").SetOptions): /*elided*/ any;
            changed<K extends keyof /*elided*/ any>(key: K): boolean;
            changed<K extends keyof /*elided*/ any>(key: K, dirty: boolean): void;
            changed(): false | string[];
            previous(): Partial<import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>>;
            previous<K extends "id" | "username" | "email" | "password" | "role" | "status" | "createdAt" | "updatedAt">(key: K): import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>[K] | undefined;
            save(options?: import("sequelize").SaveOptions<import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>> | undefined): Promise</*elided*/ any>;
            reload(options?: import("sequelize").FindOptions<import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>> | undefined): Promise</*elided*/ any>;
            validate(options?: import("sequelize/types/instance-validator").ValidationOptions): Promise<void>;
            update<K extends "id" | "username" | "email" | "password" | "role" | "status" | "createdAt" | "updatedAt">(key: K, value: import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>[K], options?: import("sequelize").InstanceUpdateOptions<import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>> | undefined): Promise</*elided*/ any>;
            update(keys: {
                id?: number | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                username?: string | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                email?: string | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                password?: string | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                role?: "user" | "admin" | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                status?: "active" | "inactive" | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                createdAt?: Date | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                updatedAt?: Date | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
            }, options?: import("sequelize").InstanceUpdateOptions<import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>> | undefined): Promise</*elided*/ any>;
            destroy(options?: import("sequelize").InstanceDestroyOptions): Promise<void>;
            restore(options?: import("sequelize").InstanceRestoreOptions): Promise<void>;
            increment<K extends "id" | "username" | "email" | "password" | "role" | "status" | "createdAt" | "updatedAt">(fields: Partial<import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>> | K | readonly K[], options?: import("sequelize").IncrementDecrementOptionsWithBy<import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>> | undefined): Promise</*elided*/ any>;
            decrement<K extends "id" | "username" | "email" | "password" | "role" | "status" | "createdAt" | "updatedAt">(fields: Partial<import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>> | K | readonly K[], options?: import("sequelize").IncrementDecrementOptionsWithBy<import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>> | undefined): Promise</*elided*/ any>;
            equals(other: /*elided*/ any): boolean;
            equalsOneOf(others: readonly /*elided*/ any[]): boolean;
            toJSON<T extends import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>>(): T;
            toJSON(): object;
            isSoftDeleted(): boolean;
            _model: import("sequelize").Model<import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>, import("sequelize").InferCreationAttributes</*elided*/ any, {
                omit: "id" | "createdAt" | "updatedAt" | "comparePassword";
            }>>;
            addHook<K extends keyof import("sequelize/types/hooks").SequelizeHooks<M, TModelAttributes, TCreationAttributes>>(hookType: K, name: string, fn: import("sequelize/types/hooks").SequelizeHooks<import("sequelize").Model<any, any>, import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>, import("sequelize").InferCreationAttributes</*elided*/ any, {
                omit: "id" | "createdAt" | "updatedAt" | "comparePassword";
            }>>[K]): /*elided*/ any;
            addHook<K extends keyof import("sequelize/types/hooks").SequelizeHooks<M, TModelAttributes, TCreationAttributes>>(hookType: K, fn: import("sequelize/types/hooks").SequelizeHooks<import("sequelize").Model<import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>, import("sequelize").InferCreationAttributes</*elided*/ any, {
                omit: "id" | "createdAt" | "updatedAt" | "comparePassword";
            }>>, import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>, import("sequelize").InferCreationAttributes</*elided*/ any, {
                omit: "id" | "createdAt" | "updatedAt" | "comparePassword";
            }>>[K]): /*elided*/ any;
            removeHook<K extends keyof import("sequelize/types/hooks").SequelizeHooks<M, TModelAttributes, TCreationAttributes>>(hookType: K, name: string): /*elided*/ any;
            hasHook<K extends keyof import("sequelize/types/hooks").SequelizeHooks<M, TModelAttributes, TCreationAttributes>>(hookType: K): boolean;
            hasHooks<K extends keyof import("sequelize/types/hooks").SequelizeHooks<M, TModelAttributes, TCreationAttributes>>(hookType: K): boolean;
        }, {
            omit: "id" | "createdAt" | "updatedAt" | "comparePassword";
        }>, never> | undefined, options?: import("sequelize").BuildOptions): {
            id: number;
            username: string;
            email: string;
            password: string;
            role: "user" | "admin";
            status: "active" | "inactive";
            createdAt: Date;
            updatedAt: Date;
            comparePassword(candidatePassword: string): Promise<boolean>;
            _attributes: import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>;
            dataValues: import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>;
            _creationAttributes: import("sequelize").InferCreationAttributes</*elided*/ any, {
                omit: "id" | "createdAt" | "updatedAt" | "comparePassword";
            }>;
            isNewRecord: boolean;
            sequelize: Sequelize;
            where(): object;
            getDataValue<K extends "id" | "username" | "email" | "password" | "role" | "status" | "createdAt" | "updatedAt">(key: K): import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>[K];
            setDataValue<K extends "id" | "username" | "email" | "password" | "role" | "status" | "createdAt" | "updatedAt">(key: K, value: import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>[K]): void;
            get(options?: {
                plain?: boolean;
                clone?: boolean;
            }): import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>;
            get<K extends keyof /*elided*/ any>(key: K, options?: {
                plain?: boolean;
                clone?: boolean;
            }): /*elided*/ any[K];
            get(key: string, options?: {
                plain?: boolean;
                clone?: boolean;
            }): unknown;
            set<K extends "id" | "username" | "email" | "password" | "role" | "status" | "createdAt" | "updatedAt">(key: K, value: import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>[K], options?: import("sequelize").SetOptions): /*elided*/ any;
            set(keys: Partial<import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>>, options?: import("sequelize").SetOptions): /*elided*/ any;
            setAttributes<K extends "id" | "username" | "email" | "password" | "role" | "status" | "createdAt" | "updatedAt">(key: K, value: import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>[K], options?: import("sequelize").SetOptions): /*elided*/ any;
            setAttributes(keys: Partial<import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>>, options?: import("sequelize").SetOptions): /*elided*/ any;
            changed<K extends keyof /*elided*/ any>(key: K): boolean;
            changed<K extends keyof /*elided*/ any>(key: K, dirty: boolean): void;
            changed(): false | string[];
            previous(): Partial<import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>>;
            previous<K extends "id" | "username" | "email" | "password" | "role" | "status" | "createdAt" | "updatedAt">(key: K): import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>[K] | undefined;
            save(options?: import("sequelize").SaveOptions<import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>> | undefined): Promise</*elided*/ any>;
            reload(options?: import("sequelize").FindOptions<import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>> | undefined): Promise</*elided*/ any>;
            validate(options?: import("sequelize/types/instance-validator").ValidationOptions): Promise<void>;
            update<K extends "id" | "username" | "email" | "password" | "role" | "status" | "createdAt" | "updatedAt">(key: K, value: import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>[K], options?: import("sequelize").InstanceUpdateOptions<import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>> | undefined): Promise</*elided*/ any>;
            update(keys: {
                id?: number | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                username?: string | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                email?: string | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                password?: string | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                role?: "user" | "admin" | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                status?: "active" | "inactive" | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                createdAt?: Date | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                updatedAt?: Date | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
            }, options?: import("sequelize").InstanceUpdateOptions<import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>> | undefined): Promise</*elided*/ any>;
            destroy(options?: import("sequelize").InstanceDestroyOptions): Promise<void>;
            restore(options?: import("sequelize").InstanceRestoreOptions): Promise<void>;
            increment<K extends "id" | "username" | "email" | "password" | "role" | "status" | "createdAt" | "updatedAt">(fields: Partial<import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>> | K | readonly K[], options?: import("sequelize").IncrementDecrementOptionsWithBy<import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>> | undefined): Promise</*elided*/ any>;
            decrement<K extends "id" | "username" | "email" | "password" | "role" | "status" | "createdAt" | "updatedAt">(fields: Partial<import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>> | K | readonly K[], options?: import("sequelize").IncrementDecrementOptionsWithBy<import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>> | undefined): Promise</*elided*/ any>;
            equals(other: /*elided*/ any): boolean;
            equalsOneOf(others: readonly /*elided*/ any[]): boolean;
            toJSON<T extends import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>>(): T;
            toJSON(): object;
            isSoftDeleted(): boolean;
            _model: import("sequelize").Model<import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>, import("sequelize").InferCreationAttributes</*elided*/ any, {
                omit: "id" | "createdAt" | "updatedAt" | "comparePassword";
            }>>;
            addHook<K extends keyof import("sequelize/types/hooks").SequelizeHooks<M, TModelAttributes, TCreationAttributes>>(hookType: K, name: string, fn: import("sequelize/types/hooks").SequelizeHooks<import("sequelize").Model<any, any>, import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>, import("sequelize").InferCreationAttributes</*elided*/ any, {
                omit: "id" | "createdAt" | "updatedAt" | "comparePassword";
            }>>[K]): /*elided*/ any;
            addHook<K extends keyof import("sequelize/types/hooks").SequelizeHooks<M, TModelAttributes, TCreationAttributes>>(hookType: K, fn: import("sequelize/types/hooks").SequelizeHooks<import("sequelize").Model<import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>, import("sequelize").InferCreationAttributes</*elided*/ any, {
                omit: "id" | "createdAt" | "updatedAt" | "comparePassword";
            }>>, import("sequelize").InferAttributes</*elided*/ any, {
                omit: never;
            }>, import("sequelize").InferCreationAttributes</*elided*/ any, {
                omit: "id" | "createdAt" | "updatedAt" | "comparePassword";
            }>>[K]): /*elided*/ any;
            removeHook<K extends keyof import("sequelize/types/hooks").SequelizeHooks<M, TModelAttributes, TCreationAttributes>>(hookType: K, name: string): /*elided*/ any;
            hasHook<K extends keyof import("sequelize/types/hooks").SequelizeHooks<M, TModelAttributes, TCreationAttributes>>(hookType: K): boolean;
            hasHooks<K extends keyof import("sequelize/types/hooks").SequelizeHooks<M, TModelAttributes, TCreationAttributes>>(hookType: K): boolean;
        };
        readonly tableName: string;
        readonly primaryKeyAttribute: string;
        readonly primaryKeyAttributes: readonly string[];
        readonly associations: {
            [key: string]: import("sequelize").Association;
        };
        readonly options: import("sequelize").InitOptions;
        readonly rawAttributes: {
            [attribute: string]: import("sequelize").ModelAttributeColumnOptions;
        };
        getAttributes<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>): { readonly [Key in keyof import("sequelize").Attributes<M>]: import("sequelize").ModelAttributeColumnOptions; };
        readonly sequelize?: Sequelize;
        init<MS extends import("sequelize").ModelStatic<import("sequelize").Model>, M extends InstanceType<MS>>(this: MS, attributes: import("sequelize").ModelAttributes<M, import("sequelize").Optional<import("sequelize").Attributes<M>, (import("sequelize").Attributes<M> extends infer T ? { [P in keyof T]-?: (keyof NonNullable<T[P]> extends Exclude<keyof NonNullable<T[P]>, Brand> ? false : true) extends true ? P : never; } : never)[keyof import("sequelize").Attributes<M>]>>, options: import("sequelize").InitOptions<M>): MS;
        removeAttribute(attribute: string): void;
        sync<M extends import("sequelize").Model>(options?: import("sequelize").SyncOptions): Promise<M>;
        drop(options?: import("sequelize").DropOptions): Promise<void>;
        schema<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, schema: string, options?: import("sequelize").SchemaOptions): import("sequelize").ModelCtor<M>;
        getTableName(): string | {
            tableName: string;
            schema: string;
            delimiter: string;
        };
        scope<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, options?: string | import("sequelize").ScopeOptions | readonly (string | import("sequelize").ScopeOptions)[] | import("sequelize").WhereAttributeHash<M>): import("sequelize").ModelCtor<M>;
        addScope<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, scope: import("sequelize").FindOptions<import("sequelize").Attributes<M>>, options?: import("sequelize").AddScopeOptions): void;
        addScope<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, scope: (...args: readonly any[]) => import("sequelize").FindOptions<import("sequelize").Attributes<M>>, options?: import("sequelize").AddScopeOptions): void;
        findAll<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, options?: import("sequelize").FindOptions<import("sequelize").Attributes<M>>): Promise<M[]>;
        findByPk<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, identifier: import("sequelize").Identifier, options: Omit<import("sequelize").NonNullFindOptions<import("sequelize").Attributes<M>>, "where">): Promise<M>;
        findByPk<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, identifier?: import("sequelize").Identifier, options?: Omit<import("sequelize").FindOptions<import("sequelize").Attributes<M>>, "where">): Promise<M | null>;
        findOne<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, options: import("sequelize").NonNullFindOptions<import("sequelize").Attributes<M>>): Promise<M>;
        findOne<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, options?: import("sequelize").FindOptions<import("sequelize").Attributes<M>>): Promise<M | null>;
        aggregate<T, M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, field: keyof import("sequelize").Attributes<M> | "*", aggregateFunction: string, options?: import("sequelize").AggregateOptions<T, import("sequelize").Attributes<M>>): Promise<T>;
        count<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, options: import("sequelize").CountWithOptions<import("sequelize").Attributes<M>>): Promise<import("sequelize").GroupedCountResultItem[]>;
        count<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, options?: Omit<import("sequelize").CountOptions<import("sequelize").Attributes<M>>, "group">): Promise<number>;
        findAndCountAll<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, options?: Omit<import("sequelize").FindAndCountOptions<import("sequelize").Attributes<M>>, "group">): Promise<{
            rows: M[];
            count: number;
        }>;
        findAndCountAll<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, options: import("sequelize/types/utils/set-required").SetRequired<import("sequelize").FindAndCountOptions<import("sequelize").Attributes<M>>, "group">): Promise<{
            rows: M[];
            count: import("sequelize").GroupedCountResultItem[];
        }>;
        max<T extends import("sequelize").DataType | unknown, M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, field: keyof import("sequelize").Attributes<M>, options?: import("sequelize").AggregateOptions<T, import("sequelize").Attributes<M>>): Promise<T>;
        min<T extends import("sequelize").DataType | unknown, M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, field: keyof import("sequelize").Attributes<M>, options?: import("sequelize").AggregateOptions<T, import("sequelize").Attributes<M>>): Promise<T>;
        sum<T extends import("sequelize").DataType | unknown, M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, field: keyof import("sequelize").Attributes<M>, options?: import("sequelize").AggregateOptions<T, import("sequelize").Attributes<M>>): Promise<number>;
        build<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, record?: import("sequelize").CreationAttributes<M>, options?: import("sequelize").BuildOptions): M;
        bulkBuild<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, records: ReadonlyArray<import("sequelize").CreationAttributes<M>>, options?: import("sequelize").BuildOptions): M[];
        create<M extends import("sequelize").Model, O extends import("sequelize").CreateOptions<import("sequelize").Attributes<M>> = import("sequelize").CreateOptions<import("sequelize").Attributes<M>>>(this: import("sequelize").ModelStatic<M>, values?: import("sequelize").CreationAttributes<M>, options?: O): Promise<O extends {
            returning: false;
        } | {
            ignoreDuplicates: true;
        } ? void : M>;
        findOrBuild<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, options: import("sequelize").FindOrBuildOptions<import("sequelize").Attributes<M>, import("sequelize").CreationAttributes<M>>): Promise<[M, boolean]>;
        findOrCreate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, options: import("sequelize").FindOrCreateOptions<import("sequelize").Attributes<M>, import("sequelize").CreationAttributes<M>>): Promise<[M, boolean]>;
        findCreateFind<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, options: import("sequelize").FindOrCreateOptions<import("sequelize").Attributes<M>, import("sequelize").CreationAttributes<M>>): Promise<[M, boolean]>;
        upsert<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, values: import("sequelize").CreationAttributes<M>, options?: import("sequelize").UpsertOptions<import("sequelize").Attributes<M>>): Promise<[M, boolean | null]>;
        bulkCreate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, records: ReadonlyArray<import("sequelize").CreationAttributes<M>>, options?: import("sequelize").BulkCreateOptions<import("sequelize").Attributes<M>>): Promise<M[]>;
        truncate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, options?: import("sequelize").TruncateOptions<import("sequelize").Attributes<M>>): Promise<void>;
        destroy<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, options?: import("sequelize").DestroyOptions<import("sequelize").Attributes<M>>): Promise<number>;
        restore<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, options?: import("sequelize").RestoreOptions<import("sequelize").Attributes<M>>): Promise<void>;
        update<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, values: { [key in keyof import("sequelize").Attributes<M>]?: import("sequelize").Attributes<M>[key] | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal; }, options: Omit<import("sequelize").UpdateOptions<import("sequelize").Attributes<M>>, "returning"> & {
            returning: Exclude<import("sequelize").UpdateOptions<import("sequelize").Attributes<M>>["returning"], undefined | false>;
        }): Promise<[affectedCount: number, affectedRows: M[]]>;
        update<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, values: { [key in keyof import("sequelize").Attributes<M>]?: import("sequelize").Attributes<M>[key] | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal; }, options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M>>): Promise<[affectedCount: number]>;
        increment<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fields: import("sequelize").AllowReadonlyArray<keyof import("sequelize").Attributes<M>>, options: import("sequelize").IncrementDecrementOptionsWithBy<import("sequelize").Attributes<M>>): Promise<[affectedRows: M[], affectedCount?: number]>;
        increment<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fields: { [key in keyof import("sequelize").Attributes<M>]?: number; }, options: import("sequelize").IncrementDecrementOptions<import("sequelize").Attributes<M>>): Promise<[affectedRows: M[], affectedCount?: number]>;
        decrement<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fields: import("sequelize").AllowReadonlyArray<keyof import("sequelize").Attributes<M>>, options: import("sequelize").IncrementDecrementOptionsWithBy<import("sequelize").Attributes<M>>): Promise<[affectedRows: M[], affectedCount?: number]>;
        decrement<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fields: { [key in keyof import("sequelize").Attributes<M>]?: number; }, options: import("sequelize").IncrementDecrementOptions<import("sequelize").Attributes<M>>): Promise<[affectedRows: M[], affectedCount?: number]>;
        describe(): Promise<object>;
        unscoped<M extends import("sequelize").ModelType>(this: M): M;
        beforeValidate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (instance: M, options: import("sequelize/types/instance-validator").ValidationOptions) => import("sequelize/types/hooks").HookReturn): void;
        beforeValidate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (instance: M, options: import("sequelize/types/instance-validator").ValidationOptions) => import("sequelize/types/hooks").HookReturn): void;
        afterValidate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (instance: M, options: import("sequelize/types/instance-validator").ValidationOptions) => import("sequelize/types/hooks").HookReturn): void;
        afterValidate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (instance: M, options: import("sequelize/types/instance-validator").ValidationOptions) => import("sequelize/types/hooks").HookReturn): void;
        beforeCreate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (instance: M, options: import("sequelize").CreateOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeCreate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (instance: M, options: import("sequelize").CreateOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        afterCreate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (instance: M, options: import("sequelize").CreateOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        afterCreate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (instance: M, options: import("sequelize").CreateOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeDestroy<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (instance: M, options: import("sequelize").InstanceDestroyOptions) => import("sequelize/types/hooks").HookReturn): void;
        beforeDestroy<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (instance: M, options: import("sequelize").InstanceDestroyOptions) => import("sequelize/types/hooks").HookReturn): void;
        afterDestroy<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (instance: M, options: import("sequelize").InstanceDestroyOptions) => import("sequelize/types/hooks").HookReturn): void;
        afterDestroy<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (instance: M, options: import("sequelize").InstanceDestroyOptions) => import("sequelize/types/hooks").HookReturn): void;
        beforeUpdate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (instance: M, options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeUpdate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (instance: M, options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        afterUpdate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (instance: M, options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        afterUpdate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (instance: M, options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeSave<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (instance: M, options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M>> | import("sequelize").SaveOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeSave<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (instance: M, options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M>> | import("sequelize").SaveOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        afterSave<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (instance: M, options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M>> | import("sequelize").SaveOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        afterSave<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (instance: M, options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M>> | import("sequelize").SaveOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeBulkCreate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (instances: M[], options: import("sequelize").BulkCreateOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeBulkCreate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (instances: M[], options: import("sequelize").BulkCreateOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        afterBulkCreate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (instances: readonly M[], options: import("sequelize").BulkCreateOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        afterBulkCreate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (instances: readonly M[], options: import("sequelize").BulkCreateOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeBulkDestroy<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (options: import("sequelize").BulkCreateOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeBulkDestroy<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (options: import("sequelize").BulkCreateOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        afterBulkDestroy<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (options: import("sequelize").DestroyOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        afterBulkDestroy<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (options: import("sequelize").DestroyOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeBulkUpdate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeBulkUpdate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        afterBulkUpdate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        afterBulkUpdate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeFind<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (options: import("sequelize").FindOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeFind<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (options: import("sequelize").FindOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeCount<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (options: import("sequelize").CountOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeCount<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (options: import("sequelize").CountOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeFindAfterExpandIncludeAll<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (options: import("sequelize").FindOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeFindAfterExpandIncludeAll<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (options: import("sequelize").FindOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeFindAfterOptions<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (options: import("sequelize").FindOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeFindAfterOptions<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (options: import("sequelize").FindOptions<import("sequelize").Attributes<M>>) => void): import("sequelize/types/hooks").HookReturn;
        afterFind<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (instancesOrInstance: readonly M[] | M | null, options: import("sequelize").FindOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        afterFind<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (instancesOrInstance: readonly M[] | M | null, options: import("sequelize").FindOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeBulkSync(name: string, fn: (options: import("sequelize").SyncOptions) => import("sequelize/types/hooks").HookReturn): void;
        beforeBulkSync(fn: (options: import("sequelize").SyncOptions) => import("sequelize/types/hooks").HookReturn): void;
        afterBulkSync(name: string, fn: (options: import("sequelize").SyncOptions) => import("sequelize/types/hooks").HookReturn): void;
        afterBulkSync(fn: (options: import("sequelize").SyncOptions) => import("sequelize/types/hooks").HookReturn): void;
        beforeSync(name: string, fn: (options: import("sequelize").SyncOptions) => import("sequelize/types/hooks").HookReturn): void;
        beforeSync(fn: (options: import("sequelize").SyncOptions) => import("sequelize/types/hooks").HookReturn): void;
        afterSync(name: string, fn: (options: import("sequelize").SyncOptions) => import("sequelize/types/hooks").HookReturn): void;
        afterSync(fn: (options: import("sequelize").SyncOptions) => import("sequelize/types/hooks").HookReturn): void;
        hasOne<M extends import("sequelize").Model, T extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, target: import("sequelize").ModelStatic<T>, options?: import("sequelize").HasOneOptions): import("sequelize").HasOne<M, T>;
        belongsTo<M extends import("sequelize").Model, T extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, target: import("sequelize").ModelStatic<T>, options?: import("sequelize").BelongsToOptions): import("sequelize").BelongsTo<M, T>;
        hasMany<M extends import("sequelize").Model, T extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, target: import("sequelize").ModelStatic<T>, options?: import("sequelize").HasManyOptions): import("sequelize").HasMany<M, T>;
        belongsToMany<M extends import("sequelize").Model, T extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, target: import("sequelize").ModelStatic<T>, options: import("sequelize").BelongsToManyOptions): import("sequelize").BelongsToMany<M, T>;
        addHook<H extends import("sequelize/types/hooks").Hooks, K extends keyof import("sequelize/types/hooks").SequelizeHooks<H["_model"], import("sequelize").Attributes<H>, import("sequelize").CreationAttributes<H>>>(this: import("sequelize/types/hooks").HooksStatic<H>, hookType: K, name: string, fn: import("sequelize/types/hooks").SequelizeHooks<H["_model"], import("sequelize").Attributes<H>, import("sequelize").CreationAttributes<H>>[K]): import("sequelize/types/hooks").HooksCtor<H>;
        addHook<H extends import("sequelize/types/hooks").Hooks, K extends keyof import("sequelize/types/hooks").SequelizeHooks<H["_model"], import("sequelize").Attributes<H>, import("sequelize").CreationAttributes<H>>>(this: import("sequelize/types/hooks").HooksStatic<H>, hookType: K, fn: import("sequelize/types/hooks").SequelizeHooks<H["_model"], import("sequelize").Attributes<H>, import("sequelize").CreationAttributes<H>>[K]): import("sequelize/types/hooks").HooksCtor<H>;
        removeHook<H extends import("sequelize/types/hooks").Hooks>(this: import("sequelize/types/hooks").HooksStatic<H>, hookType: keyof import("sequelize/types/hooks").SequelizeHooks<H["_model"], import("sequelize").Attributes<H>, import("sequelize").CreationAttributes<H>>, name: string): import("sequelize/types/hooks").HooksCtor<H>;
        hasHook<H extends import("sequelize/types/hooks").Hooks>(this: import("sequelize/types/hooks").HooksStatic<H>, hookType: keyof import("sequelize/types/hooks").SequelizeHooks<H["_model"], import("sequelize").Attributes<H>, import("sequelize").CreationAttributes<H>>): boolean;
        hasHooks<H extends import("sequelize/types/hooks").Hooks>(this: import("sequelize/types/hooks").HooksStatic<H>, hookType: keyof import("sequelize/types/hooks").SequelizeHooks<H["_model"], import("sequelize").Attributes<H>, import("sequelize").CreationAttributes<H>>): boolean;
    };
    Message: {
        new (values?: import("sequelize").Optional<import("./Message").MessageCreationAttributes, import("sequelize/types/utils").NullishPropertiesOf<import("./Message").MessageCreationAttributes>> | undefined, options?: import("sequelize").BuildOptions): {
            id: number;
            senderId: number;
            recipientId: number;
            content: string;
            isRead: boolean;
            createdAt: Date;
            updatedAt: Date;
            sender?: any;
            recipient?: any;
            _attributes: import("./Message").MessageAttributes;
            dataValues: import("./Message").MessageAttributes;
            _creationAttributes: import("./Message").MessageCreationAttributes;
            isNewRecord: boolean;
            sequelize: Sequelize;
            where(): object;
            getDataValue<K extends keyof import("./Message").MessageAttributes>(key: K): import("./Message").MessageAttributes[K];
            setDataValue<K extends keyof import("./Message").MessageAttributes>(key: K, value: import("./Message").MessageAttributes[K]): void;
            get(options?: {
                plain?: boolean;
                clone?: boolean;
            }): import("./Message").MessageAttributes;
            get<K extends keyof /*elided*/ any>(key: K, options?: {
                plain?: boolean;
                clone?: boolean;
            }): /*elided*/ any[K];
            get(key: string, options?: {
                plain?: boolean;
                clone?: boolean;
            }): unknown;
            set<K extends keyof import("./Message").MessageAttributes>(key: K, value: import("./Message").MessageAttributes[K], options?: import("sequelize").SetOptions): /*elided*/ any;
            set(keys: Partial<import("./Message").MessageAttributes>, options?: import("sequelize").SetOptions): /*elided*/ any;
            setAttributes<K extends keyof import("./Message").MessageAttributes>(key: K, value: import("./Message").MessageAttributes[K], options?: import("sequelize").SetOptions): /*elided*/ any;
            setAttributes(keys: Partial<import("./Message").MessageAttributes>, options?: import("sequelize").SetOptions): /*elided*/ any;
            changed<K extends keyof /*elided*/ any>(key: K): boolean;
            changed<K extends keyof /*elided*/ any>(key: K, dirty: boolean): void;
            changed(): false | string[];
            previous(): Partial<import("./Message").MessageAttributes>;
            previous<K extends keyof import("./Message").MessageAttributes>(key: K): import("./Message").MessageAttributes[K] | undefined;
            save(options?: import("sequelize").SaveOptions<import("./Message").MessageAttributes> | undefined): Promise</*elided*/ any>;
            reload(options?: import("sequelize").FindOptions<import("./Message").MessageAttributes> | undefined): Promise</*elided*/ any>;
            validate(options?: import("sequelize/types/instance-validator").ValidationOptions): Promise<void>;
            update<K extends keyof import("./Message").MessageAttributes>(key: K, value: import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | import("./Message").MessageAttributes[K], options?: import("sequelize").InstanceUpdateOptions<import("./Message").MessageAttributes> | undefined): Promise</*elided*/ any>;
            update(keys: {
                id?: number | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                senderId?: number | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                recipientId?: number | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                content?: string | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                isRead?: boolean | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                createdAt?: Date | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                updatedAt?: Date | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                sender?: import("sequelize").InferAttributes<{
                    id: number;
                    username: string;
                    email: string;
                    password: string;
                    role: "user" | "admin";
                    status: "active" | "inactive";
                    createdAt: Date;
                    updatedAt: Date;
                    comparePassword(candidatePassword: string): Promise<boolean>;
                    _attributes: import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>;
                    dataValues: import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>;
                    _creationAttributes: import("sequelize").InferCreationAttributes</*elided*/ any, {
                        omit: "id" | "createdAt" | "updatedAt" | "comparePassword";
                    }>;
                    isNewRecord: boolean;
                    sequelize: Sequelize;
                    where(): object;
                    getDataValue<K extends "id" | "username" | "email" | "password" | "role" | "status" | "createdAt" | "updatedAt">(key: K): import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>[K];
                    setDataValue<K extends "id" | "username" | "email" | "password" | "role" | "status" | "createdAt" | "updatedAt">(key: K, value: import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>[K]): void;
                    get(options?: {
                        plain?: boolean;
                        clone?: boolean;
                    }): import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>;
                    get<K extends keyof /*elided*/ any>(key: K, options?: {
                        plain?: boolean;
                        clone?: boolean;
                    }): /*elided*/ any[K];
                    get(key: string, options?: {
                        plain?: boolean;
                        clone?: boolean;
                    }): unknown;
                    set<K extends "id" | "username" | "email" | "password" | "role" | "status" | "createdAt" | "updatedAt">(key: K, value: import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>[K], options?: import("sequelize").SetOptions): /*elided*/ any;
                    set(keys: Partial<import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>>, options?: import("sequelize").SetOptions): /*elided*/ any;
                    setAttributes<K extends "id" | "username" | "email" | "password" | "role" | "status" | "createdAt" | "updatedAt">(key: K, value: import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>[K], options?: import("sequelize").SetOptions): /*elided*/ any;
                    setAttributes(keys: Partial<import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>>, options?: import("sequelize").SetOptions): /*elided*/ any;
                    changed<K extends keyof /*elided*/ any>(key: K): boolean;
                    changed<K extends keyof /*elided*/ any>(key: K, dirty: boolean): void;
                    changed(): false | string[];
                    previous(): Partial<import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>>;
                    previous<K extends "id" | "username" | "email" | "password" | "role" | "status" | "createdAt" | "updatedAt">(key: K): import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>[K] | undefined;
                    save(options?: import("sequelize").SaveOptions<import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>> | undefined): Promise</*elided*/ any>;
                    reload(options?: import("sequelize").FindOptions<import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>> | undefined): Promise</*elided*/ any>;
                    validate(options?: import("sequelize/types/instance-validator").ValidationOptions): Promise<void>;
                    update<K extends "id" | "username" | "email" | "password" | "role" | "status" | "createdAt" | "updatedAt">(key: K, value: import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>[K], options?: import("sequelize").InstanceUpdateOptions<import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>> | undefined): Promise</*elided*/ any>;
                    update(keys: {
                        id?: number | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                        username?: string | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                        email?: string | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                        password?: string | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                        role?: "user" | "admin" | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                        status?: "active" | "inactive" | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                        createdAt?: Date | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                        updatedAt?: Date | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                    }, options?: import("sequelize").InstanceUpdateOptions<import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>> | undefined): Promise</*elided*/ any>;
                    destroy(options?: import("sequelize").InstanceDestroyOptions): Promise<void>;
                    restore(options?: import("sequelize").InstanceRestoreOptions): Promise<void>;
                    increment<K extends "id" | "username" | "email" | "password" | "role" | "status" | "createdAt" | "updatedAt">(fields: Partial<import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>> | K | readonly K[], options?: import("sequelize").IncrementDecrementOptionsWithBy<import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>> | undefined): Promise</*elided*/ any>;
                    decrement<K extends "id" | "username" | "email" | "password" | "role" | "status" | "createdAt" | "updatedAt">(fields: Partial<import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>> | K | readonly K[], options?: import("sequelize").IncrementDecrementOptionsWithBy<import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>> | undefined): Promise</*elided*/ any>;
                    equals(other: /*elided*/ any): boolean;
                    equalsOneOf(others: readonly /*elided*/ any[]): boolean;
                    toJSON<T extends import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>>(): T;
                    toJSON(): object;
                    isSoftDeleted(): boolean;
                    _model: import("sequelize").Model<import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>, import("sequelize").InferCreationAttributes</*elided*/ any, {
                        omit: "id" | "createdAt" | "updatedAt" | "comparePassword";
                    }>>;
                    addHook<K extends keyof import("sequelize/types/hooks").SequelizeHooks<M, TModelAttributes, TCreationAttributes>>(hookType: K, name: string, fn: import("sequelize/types/hooks").SequelizeHooks<import("sequelize").Model<any, any>, import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>, import("sequelize").InferCreationAttributes</*elided*/ any, {
                        omit: "id" | "createdAt" | "updatedAt" | "comparePassword";
                    }>>[K]): /*elided*/ any;
                    addHook<K extends keyof import("sequelize/types/hooks").SequelizeHooks<M, TModelAttributes, TCreationAttributes>>(hookType: K, fn: import("sequelize/types/hooks").SequelizeHooks<import("sequelize").Model<import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>, import("sequelize").InferCreationAttributes</*elided*/ any, {
                        omit: "id" | "createdAt" | "updatedAt" | "comparePassword";
                    }>>, import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>, import("sequelize").InferCreationAttributes</*elided*/ any, {
                        omit: "id" | "createdAt" | "updatedAt" | "comparePassword";
                    }>>[K]): /*elided*/ any;
                    removeHook<K extends keyof import("sequelize/types/hooks").SequelizeHooks<M, TModelAttributes, TCreationAttributes>>(hookType: K, name: string): /*elided*/ any;
                    hasHook<K extends keyof import("sequelize/types/hooks").SequelizeHooks<M, TModelAttributes, TCreationAttributes>>(hookType: K): boolean;
                    hasHooks<K extends keyof import("sequelize/types/hooks").SequelizeHooks<M, TModelAttributes, TCreationAttributes>>(hookType: K): boolean;
                }, {
                    omit: never;
                }> | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                recipient?: import("sequelize").InferAttributes<{
                    id: number;
                    username: string;
                    email: string;
                    password: string;
                    role: "user" | "admin";
                    status: "active" | "inactive";
                    createdAt: Date;
                    updatedAt: Date;
                    comparePassword(candidatePassword: string): Promise<boolean>;
                    _attributes: import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>;
                    dataValues: import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>;
                    _creationAttributes: import("sequelize").InferCreationAttributes</*elided*/ any, {
                        omit: "id" | "createdAt" | "updatedAt" | "comparePassword";
                    }>;
                    isNewRecord: boolean;
                    sequelize: Sequelize;
                    where(): object;
                    getDataValue<K extends "id" | "username" | "email" | "password" | "role" | "status" | "createdAt" | "updatedAt">(key: K): import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>[K];
                    setDataValue<K extends "id" | "username" | "email" | "password" | "role" | "status" | "createdAt" | "updatedAt">(key: K, value: import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>[K]): void;
                    get(options?: {
                        plain?: boolean;
                        clone?: boolean;
                    }): import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>;
                    get<K extends keyof /*elided*/ any>(key: K, options?: {
                        plain?: boolean;
                        clone?: boolean;
                    }): /*elided*/ any[K];
                    get(key: string, options?: {
                        plain?: boolean;
                        clone?: boolean;
                    }): unknown;
                    set<K extends "id" | "username" | "email" | "password" | "role" | "status" | "createdAt" | "updatedAt">(key: K, value: import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>[K], options?: import("sequelize").SetOptions): /*elided*/ any;
                    set(keys: Partial<import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>>, options?: import("sequelize").SetOptions): /*elided*/ any;
                    setAttributes<K extends "id" | "username" | "email" | "password" | "role" | "status" | "createdAt" | "updatedAt">(key: K, value: import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>[K], options?: import("sequelize").SetOptions): /*elided*/ any;
                    setAttributes(keys: Partial<import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>>, options?: import("sequelize").SetOptions): /*elided*/ any;
                    changed<K extends keyof /*elided*/ any>(key: K): boolean;
                    changed<K extends keyof /*elided*/ any>(key: K, dirty: boolean): void;
                    changed(): false | string[];
                    previous(): Partial<import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>>;
                    previous<K extends "id" | "username" | "email" | "password" | "role" | "status" | "createdAt" | "updatedAt">(key: K): import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>[K] | undefined;
                    save(options?: import("sequelize").SaveOptions<import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>> | undefined): Promise</*elided*/ any>;
                    reload(options?: import("sequelize").FindOptions<import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>> | undefined): Promise</*elided*/ any>;
                    validate(options?: import("sequelize/types/instance-validator").ValidationOptions): Promise<void>;
                    update<K extends "id" | "username" | "email" | "password" | "role" | "status" | "createdAt" | "updatedAt">(key: K, value: import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>[K], options?: import("sequelize").InstanceUpdateOptions<import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>> | undefined): Promise</*elided*/ any>;
                    update(keys: {
                        id?: number | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                        username?: string | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                        email?: string | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                        password?: string | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                        role?: "user" | "admin" | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                        status?: "active" | "inactive" | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                        createdAt?: Date | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                        updatedAt?: Date | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
                    }, options?: import("sequelize").InstanceUpdateOptions<import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>> | undefined): Promise</*elided*/ any>;
                    destroy(options?: import("sequelize").InstanceDestroyOptions): Promise<void>;
                    restore(options?: import("sequelize").InstanceRestoreOptions): Promise<void>;
                    increment<K extends "id" | "username" | "email" | "password" | "role" | "status" | "createdAt" | "updatedAt">(fields: Partial<import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>> | K | readonly K[], options?: import("sequelize").IncrementDecrementOptionsWithBy<import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>> | undefined): Promise</*elided*/ any>;
                    decrement<K extends "id" | "username" | "email" | "password" | "role" | "status" | "createdAt" | "updatedAt">(fields: Partial<import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>> | K | readonly K[], options?: import("sequelize").IncrementDecrementOptionsWithBy<import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>> | undefined): Promise</*elided*/ any>;
                    equals(other: /*elided*/ any): boolean;
                    equalsOneOf(others: readonly /*elided*/ any[]): boolean;
                    toJSON<T extends import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>>(): T;
                    toJSON(): object;
                    isSoftDeleted(): boolean;
                    _model: import("sequelize").Model<import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>, import("sequelize").InferCreationAttributes</*elided*/ any, {
                        omit: "id" | "createdAt" | "updatedAt" | "comparePassword";
                    }>>;
                    addHook<K extends keyof import("sequelize/types/hooks").SequelizeHooks<M, TModelAttributes, TCreationAttributes>>(hookType: K, name: string, fn: import("sequelize/types/hooks").SequelizeHooks<import("sequelize").Model<any, any>, import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>, import("sequelize").InferCreationAttributes</*elided*/ any, {
                        omit: "id" | "createdAt" | "updatedAt" | "comparePassword";
                    }>>[K]): /*elided*/ any;
                    addHook<K extends keyof import("sequelize/types/hooks").SequelizeHooks<M, TModelAttributes, TCreationAttributes>>(hookType: K, fn: import("sequelize/types/hooks").SequelizeHooks<import("sequelize").Model<import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>, import("sequelize").InferCreationAttributes</*elided*/ any, {
                        omit: "id" | "createdAt" | "updatedAt" | "comparePassword";
                    }>>, import("sequelize").InferAttributes</*elided*/ any, {
                        omit: never;
                    }>, import("sequelize").InferCreationAttributes</*elided*/ any, {
                        omit: "id" | "createdAt" | "updatedAt" | "comparePassword";
                    }>>[K]): /*elided*/ any;
                    removeHook<K extends keyof import("sequelize/types/hooks").SequelizeHooks<M, TModelAttributes, TCreationAttributes>>(hookType: K, name: string): /*elided*/ any;
                    hasHook<K extends keyof import("sequelize/types/hooks").SequelizeHooks<M, TModelAttributes, TCreationAttributes>>(hookType: K): boolean;
                    hasHooks<K extends keyof import("sequelize/types/hooks").SequelizeHooks<M, TModelAttributes, TCreationAttributes>>(hookType: K): boolean;
                }, {
                    omit: never;
                }> | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | undefined;
            }, options?: import("sequelize").InstanceUpdateOptions<import("./Message").MessageAttributes> | undefined): Promise</*elided*/ any>;
            destroy(options?: import("sequelize").InstanceDestroyOptions): Promise<void>;
            restore(options?: import("sequelize").InstanceRestoreOptions): Promise<void>;
            increment<K extends keyof import("./Message").MessageAttributes>(fields: Partial<import("./Message").MessageAttributes> | K | readonly K[], options?: import("sequelize").IncrementDecrementOptionsWithBy<import("./Message").MessageAttributes> | undefined): Promise</*elided*/ any>;
            decrement<K extends keyof import("./Message").MessageAttributes>(fields: Partial<import("./Message").MessageAttributes> | K | readonly K[], options?: import("sequelize").IncrementDecrementOptionsWithBy<import("./Message").MessageAttributes> | undefined): Promise</*elided*/ any>;
            equals(other: /*elided*/ any): boolean;
            equalsOneOf(others: readonly /*elided*/ any[]): boolean;
            toJSON<T extends import("./Message").MessageAttributes>(): T;
            toJSON(): object;
            isSoftDeleted(): boolean;
            _model: import("sequelize").Model<import("./Message").MessageAttributes, import("./Message").MessageCreationAttributes>;
            addHook<K extends keyof import("sequelize/types/hooks").SequelizeHooks<M, TModelAttributes, TCreationAttributes>>(hookType: K, name: string, fn: import("sequelize/types/hooks").SequelizeHooks<import("sequelize").Model<any, any>, import("./Message").MessageAttributes, import("./Message").MessageCreationAttributes>[K]): /*elided*/ any;
            addHook<K extends keyof import("sequelize/types/hooks").SequelizeHooks<M, TModelAttributes, TCreationAttributes>>(hookType: K, fn: import("sequelize/types/hooks").SequelizeHooks<import("sequelize").Model<import("./Message").MessageAttributes, import("./Message").MessageCreationAttributes>, import("./Message").MessageAttributes, import("./Message").MessageCreationAttributes>[K]): /*elided*/ any;
            removeHook<K extends keyof import("sequelize/types/hooks").SequelizeHooks<M, TModelAttributes, TCreationAttributes>>(hookType: K, name: string): /*elided*/ any;
            hasHook<K extends keyof import("sequelize/types/hooks").SequelizeHooks<M, TModelAttributes, TCreationAttributes>>(hookType: K): boolean;
            hasHooks<K extends keyof import("sequelize/types/hooks").SequelizeHooks<M, TModelAttributes, TCreationAttributes>>(hookType: K): boolean;
        };
        readonly tableName: string;
        readonly primaryKeyAttribute: string;
        readonly primaryKeyAttributes: readonly string[];
        readonly associations: {
            [key: string]: import("sequelize").Association;
        };
        readonly options: import("sequelize").InitOptions;
        readonly rawAttributes: {
            [attribute: string]: import("sequelize").ModelAttributeColumnOptions;
        };
        getAttributes<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>): { readonly [Key in keyof import("sequelize").Attributes<M>]: import("sequelize").ModelAttributeColumnOptions; };
        readonly sequelize?: Sequelize;
        init<MS extends import("sequelize").ModelStatic<import("sequelize").Model>, M extends InstanceType<MS>>(this: MS, attributes: import("sequelize").ModelAttributes<M, import("sequelize").Optional<import("sequelize").Attributes<M>, (import("sequelize").Attributes<M> extends infer T ? { [P in keyof T]-?: (keyof NonNullable<T[P]> extends Exclude<keyof NonNullable<T[P]>, Brand> ? false : true) extends true ? P : never; } : never)[keyof import("sequelize").Attributes<M>]>>, options: import("sequelize").InitOptions<M>): MS;
        removeAttribute(attribute: string): void;
        sync<M extends import("sequelize").Model>(options?: import("sequelize").SyncOptions): Promise<M>;
        drop(options?: import("sequelize").DropOptions): Promise<void>;
        schema<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, schema: string, options?: import("sequelize").SchemaOptions): import("sequelize").ModelCtor<M>;
        getTableName(): string | {
            tableName: string;
            schema: string;
            delimiter: string;
        };
        scope<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, options?: string | import("sequelize").ScopeOptions | readonly (string | import("sequelize").ScopeOptions)[] | import("sequelize").WhereAttributeHash<M>): import("sequelize").ModelCtor<M>;
        addScope<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, scope: import("sequelize").FindOptions<import("sequelize").Attributes<M>>, options?: import("sequelize").AddScopeOptions): void;
        addScope<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, scope: (...args: readonly any[]) => import("sequelize").FindOptions<import("sequelize").Attributes<M>>, options?: import("sequelize").AddScopeOptions): void;
        findAll<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, options?: import("sequelize").FindOptions<import("sequelize").Attributes<M>>): Promise<M[]>;
        findByPk<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, identifier: import("sequelize").Identifier, options: Omit<import("sequelize").NonNullFindOptions<import("sequelize").Attributes<M>>, "where">): Promise<M>;
        findByPk<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, identifier?: import("sequelize").Identifier, options?: Omit<import("sequelize").FindOptions<import("sequelize").Attributes<M>>, "where">): Promise<M | null>;
        findOne<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, options: import("sequelize").NonNullFindOptions<import("sequelize").Attributes<M>>): Promise<M>;
        findOne<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, options?: import("sequelize").FindOptions<import("sequelize").Attributes<M>>): Promise<M | null>;
        aggregate<T, M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, field: keyof import("sequelize").Attributes<M> | "*", aggregateFunction: string, options?: import("sequelize").AggregateOptions<T, import("sequelize").Attributes<M>>): Promise<T>;
        count<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, options: import("sequelize").CountWithOptions<import("sequelize").Attributes<M>>): Promise<import("sequelize").GroupedCountResultItem[]>;
        count<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, options?: Omit<import("sequelize").CountOptions<import("sequelize").Attributes<M>>, "group">): Promise<number>;
        findAndCountAll<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, options?: Omit<import("sequelize").FindAndCountOptions<import("sequelize").Attributes<M>>, "group">): Promise<{
            rows: M[];
            count: number;
        }>;
        findAndCountAll<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, options: import("sequelize/types/utils/set-required").SetRequired<import("sequelize").FindAndCountOptions<import("sequelize").Attributes<M>>, "group">): Promise<{
            rows: M[];
            count: import("sequelize").GroupedCountResultItem[];
        }>;
        max<T extends import("sequelize").DataType | unknown, M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, field: keyof import("sequelize").Attributes<M>, options?: import("sequelize").AggregateOptions<T, import("sequelize").Attributes<M>>): Promise<T>;
        min<T extends import("sequelize").DataType | unknown, M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, field: keyof import("sequelize").Attributes<M>, options?: import("sequelize").AggregateOptions<T, import("sequelize").Attributes<M>>): Promise<T>;
        sum<T extends import("sequelize").DataType | unknown, M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, field: keyof import("sequelize").Attributes<M>, options?: import("sequelize").AggregateOptions<T, import("sequelize").Attributes<M>>): Promise<number>;
        build<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, record?: import("sequelize").CreationAttributes<M>, options?: import("sequelize").BuildOptions): M;
        bulkBuild<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, records: ReadonlyArray<import("sequelize").CreationAttributes<M>>, options?: import("sequelize").BuildOptions): M[];
        create<M extends import("sequelize").Model, O extends import("sequelize").CreateOptions<import("sequelize").Attributes<M>> = import("sequelize").CreateOptions<import("sequelize").Attributes<M>>>(this: import("sequelize").ModelStatic<M>, values?: import("sequelize").CreationAttributes<M>, options?: O): Promise<O extends {
            returning: false;
        } | {
            ignoreDuplicates: true;
        } ? void : M>;
        findOrBuild<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, options: import("sequelize").FindOrBuildOptions<import("sequelize").Attributes<M>, import("sequelize").CreationAttributes<M>>): Promise<[M, boolean]>;
        findOrCreate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, options: import("sequelize").FindOrCreateOptions<import("sequelize").Attributes<M>, import("sequelize").CreationAttributes<M>>): Promise<[M, boolean]>;
        findCreateFind<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, options: import("sequelize").FindOrCreateOptions<import("sequelize").Attributes<M>, import("sequelize").CreationAttributes<M>>): Promise<[M, boolean]>;
        upsert<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, values: import("sequelize").CreationAttributes<M>, options?: import("sequelize").UpsertOptions<import("sequelize").Attributes<M>>): Promise<[M, boolean | null]>;
        bulkCreate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, records: ReadonlyArray<import("sequelize").CreationAttributes<M>>, options?: import("sequelize").BulkCreateOptions<import("sequelize").Attributes<M>>): Promise<M[]>;
        truncate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, options?: import("sequelize").TruncateOptions<import("sequelize").Attributes<M>>): Promise<void>;
        destroy<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, options?: import("sequelize").DestroyOptions<import("sequelize").Attributes<M>>): Promise<number>;
        restore<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, options?: import("sequelize").RestoreOptions<import("sequelize").Attributes<M>>): Promise<void>;
        update<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, values: { [key in keyof import("sequelize").Attributes<M>]?: import("sequelize").Attributes<M>[key] | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal; }, options: Omit<import("sequelize").UpdateOptions<import("sequelize").Attributes<M>>, "returning"> & {
            returning: Exclude<import("sequelize").UpdateOptions<import("sequelize").Attributes<M>>["returning"], undefined | false>;
        }): Promise<[affectedCount: number, affectedRows: M[]]>;
        update<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, values: { [key in keyof import("sequelize").Attributes<M>]?: import("sequelize").Attributes<M>[key] | import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal; }, options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M>>): Promise<[affectedCount: number]>;
        increment<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fields: import("sequelize").AllowReadonlyArray<keyof import("sequelize").Attributes<M>>, options: import("sequelize").IncrementDecrementOptionsWithBy<import("sequelize").Attributes<M>>): Promise<[affectedRows: M[], affectedCount?: number]>;
        increment<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fields: { [key in keyof import("sequelize").Attributes<M>]?: number; }, options: import("sequelize").IncrementDecrementOptions<import("sequelize").Attributes<M>>): Promise<[affectedRows: M[], affectedCount?: number]>;
        decrement<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fields: import("sequelize").AllowReadonlyArray<keyof import("sequelize").Attributes<M>>, options: import("sequelize").IncrementDecrementOptionsWithBy<import("sequelize").Attributes<M>>): Promise<[affectedRows: M[], affectedCount?: number]>;
        decrement<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fields: { [key in keyof import("sequelize").Attributes<M>]?: number; }, options: import("sequelize").IncrementDecrementOptions<import("sequelize").Attributes<M>>): Promise<[affectedRows: M[], affectedCount?: number]>;
        describe(): Promise<object>;
        unscoped<M extends import("sequelize").ModelType>(this: M): M;
        beforeValidate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (instance: M, options: import("sequelize/types/instance-validator").ValidationOptions) => import("sequelize/types/hooks").HookReturn): void;
        beforeValidate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (instance: M, options: import("sequelize/types/instance-validator").ValidationOptions) => import("sequelize/types/hooks").HookReturn): void;
        afterValidate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (instance: M, options: import("sequelize/types/instance-validator").ValidationOptions) => import("sequelize/types/hooks").HookReturn): void;
        afterValidate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (instance: M, options: import("sequelize/types/instance-validator").ValidationOptions) => import("sequelize/types/hooks").HookReturn): void;
        beforeCreate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (instance: M, options: import("sequelize").CreateOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeCreate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (instance: M, options: import("sequelize").CreateOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        afterCreate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (instance: M, options: import("sequelize").CreateOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        afterCreate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (instance: M, options: import("sequelize").CreateOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeDestroy<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (instance: M, options: import("sequelize").InstanceDestroyOptions) => import("sequelize/types/hooks").HookReturn): void;
        beforeDestroy<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (instance: M, options: import("sequelize").InstanceDestroyOptions) => import("sequelize/types/hooks").HookReturn): void;
        afterDestroy<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (instance: M, options: import("sequelize").InstanceDestroyOptions) => import("sequelize/types/hooks").HookReturn): void;
        afterDestroy<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (instance: M, options: import("sequelize").InstanceDestroyOptions) => import("sequelize/types/hooks").HookReturn): void;
        beforeUpdate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (instance: M, options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeUpdate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (instance: M, options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        afterUpdate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (instance: M, options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        afterUpdate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (instance: M, options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeSave<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (instance: M, options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M>> | import("sequelize").SaveOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeSave<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (instance: M, options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M>> | import("sequelize").SaveOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        afterSave<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (instance: M, options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M>> | import("sequelize").SaveOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        afterSave<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (instance: M, options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M>> | import("sequelize").SaveOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeBulkCreate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (instances: M[], options: import("sequelize").BulkCreateOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeBulkCreate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (instances: M[], options: import("sequelize").BulkCreateOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        afterBulkCreate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (instances: readonly M[], options: import("sequelize").BulkCreateOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        afterBulkCreate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (instances: readonly M[], options: import("sequelize").BulkCreateOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeBulkDestroy<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (options: import("sequelize").BulkCreateOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeBulkDestroy<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (options: import("sequelize").BulkCreateOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        afterBulkDestroy<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (options: import("sequelize").DestroyOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        afterBulkDestroy<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (options: import("sequelize").DestroyOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeBulkUpdate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeBulkUpdate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        afterBulkUpdate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        afterBulkUpdate<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeFind<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (options: import("sequelize").FindOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeFind<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (options: import("sequelize").FindOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeCount<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (options: import("sequelize").CountOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeCount<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (options: import("sequelize").CountOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeFindAfterExpandIncludeAll<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (options: import("sequelize").FindOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeFindAfterExpandIncludeAll<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (options: import("sequelize").FindOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeFindAfterOptions<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (options: import("sequelize").FindOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeFindAfterOptions<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (options: import("sequelize").FindOptions<import("sequelize").Attributes<M>>) => void): import("sequelize/types/hooks").HookReturn;
        afterFind<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, name: string, fn: (instancesOrInstance: readonly M[] | M | null, options: import("sequelize").FindOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        afterFind<M extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, fn: (instancesOrInstance: readonly M[] | M | null, options: import("sequelize").FindOptions<import("sequelize").Attributes<M>>) => import("sequelize/types/hooks").HookReturn): void;
        beforeBulkSync(name: string, fn: (options: import("sequelize").SyncOptions) => import("sequelize/types/hooks").HookReturn): void;
        beforeBulkSync(fn: (options: import("sequelize").SyncOptions) => import("sequelize/types/hooks").HookReturn): void;
        afterBulkSync(name: string, fn: (options: import("sequelize").SyncOptions) => import("sequelize/types/hooks").HookReturn): void;
        afterBulkSync(fn: (options: import("sequelize").SyncOptions) => import("sequelize/types/hooks").HookReturn): void;
        beforeSync(name: string, fn: (options: import("sequelize").SyncOptions) => import("sequelize/types/hooks").HookReturn): void;
        beforeSync(fn: (options: import("sequelize").SyncOptions) => import("sequelize/types/hooks").HookReturn): void;
        afterSync(name: string, fn: (options: import("sequelize").SyncOptions) => import("sequelize/types/hooks").HookReturn): void;
        afterSync(fn: (options: import("sequelize").SyncOptions) => import("sequelize/types/hooks").HookReturn): void;
        hasOne<M extends import("sequelize").Model, T extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, target: import("sequelize").ModelStatic<T>, options?: import("sequelize").HasOneOptions): import("sequelize").HasOne<M, T>;
        belongsTo<M extends import("sequelize").Model, T extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, target: import("sequelize").ModelStatic<T>, options?: import("sequelize").BelongsToOptions): import("sequelize").BelongsTo<M, T>;
        hasMany<M extends import("sequelize").Model, T extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, target: import("sequelize").ModelStatic<T>, options?: import("sequelize").HasManyOptions): import("sequelize").HasMany<M, T>;
        belongsToMany<M extends import("sequelize").Model, T extends import("sequelize").Model>(this: import("sequelize").ModelStatic<M>, target: import("sequelize").ModelStatic<T>, options: import("sequelize").BelongsToManyOptions): import("sequelize").BelongsToMany<M, T>;
        addHook<H extends import("sequelize/types/hooks").Hooks, K extends keyof import("sequelize/types/hooks").SequelizeHooks<H["_model"], import("sequelize").Attributes<H>, import("sequelize").CreationAttributes<H>>>(this: import("sequelize/types/hooks").HooksStatic<H>, hookType: K, name: string, fn: import("sequelize/types/hooks").SequelizeHooks<H["_model"], import("sequelize").Attributes<H>, import("sequelize").CreationAttributes<H>>[K]): import("sequelize/types/hooks").HooksCtor<H>;
        addHook<H extends import("sequelize/types/hooks").Hooks, K extends keyof import("sequelize/types/hooks").SequelizeHooks<H["_model"], import("sequelize").Attributes<H>, import("sequelize").CreationAttributes<H>>>(this: import("sequelize/types/hooks").HooksStatic<H>, hookType: K, fn: import("sequelize/types/hooks").SequelizeHooks<H["_model"], import("sequelize").Attributes<H>, import("sequelize").CreationAttributes<H>>[K]): import("sequelize/types/hooks").HooksCtor<H>;
        removeHook<H extends import("sequelize/types/hooks").Hooks>(this: import("sequelize/types/hooks").HooksStatic<H>, hookType: keyof import("sequelize/types/hooks").SequelizeHooks<H["_model"], import("sequelize").Attributes<H>, import("sequelize").CreationAttributes<H>>, name: string): import("sequelize/types/hooks").HooksCtor<H>;
        hasHook<H extends import("sequelize/types/hooks").Hooks>(this: import("sequelize/types/hooks").HooksStatic<H>, hookType: keyof import("sequelize/types/hooks").SequelizeHooks<H["_model"], import("sequelize").Attributes<H>, import("sequelize").CreationAttributes<H>>): boolean;
        hasHooks<H extends import("sequelize/types/hooks").Hooks>(this: import("sequelize/types/hooks").HooksStatic<H>, hookType: keyof import("sequelize/types/hooks").SequelizeHooks<H["_model"], import("sequelize").Attributes<H>, import("sequelize").CreationAttributes<H>>): boolean;
    };
};
export type { UserAttributes, UserCreationAttributes } from './User';
export type { MessageAttributes, MessageCreationAttributes } from './Message';
//# sourceMappingURL=index.d.ts.map