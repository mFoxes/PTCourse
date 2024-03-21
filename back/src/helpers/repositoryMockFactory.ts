import { Repository } from "sequelize-typescript";
import { MockType } from "./mockType";

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
    () => ({
        findOne: jest.fn((entity) => entity),
        findAll: jest.fn((entity) => entity),
    })
);
