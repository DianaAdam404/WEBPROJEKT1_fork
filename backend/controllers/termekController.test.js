import TermekController from "./termekController";
import { expect, jest, test } from "@jest/globals";
import termekModel from "../models/termekModel.js";

const mockedModel = jest.fn < TermekModel > (() => ({}));

test("dummy test", async () => {
    expect(true).toBe(true);
    const resultMock = {};

    // mockedModel.getAll = jest
    //     .fn()
    //     .mockResolvedValue([{ id: 1, nev: "Termék 1", ar: 1000, keszlet: 10 }]);

    mockedModel.getAll = {};
    await TermekController.getAll({ parms: {} }, { json: jest.fn() });
});
