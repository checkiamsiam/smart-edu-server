import { RequestHandler } from "express";
import httpStatus from "http-status";
import catchAsyncErrors from "../../utils/catchAsyncError.util";
import AppError from "../../utils/customError.util";
import sendResponse from "../../utils/sendResponse.util";
import { academicSemesterTitleCodeMapper } from "./academicSemester.constant";
import { IAcademicSemester } from "./academicSemester.interface";
import academicSemesterService from "./academicSemester.service";

const createAcademicSemester: RequestHandler = catchAsyncErrors(
  async (req, res) => {
    const body: IAcademicSemester = req.body;
    if (academicSemesterTitleCodeMapper[body.title] !== body.code) {
      throw new AppError("invalid code", httpStatus.BAD_REQUEST);
    }
    const result = await academicSemesterService.create(body);
    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Semester created successfully",
      data: result,
    });
  }
);
const getAcademicSemesters: RequestHandler = catchAsyncErrors(
  async (req, res) => {
    res.send(req.queryFeatures);
  }
);

const academicSemesterController = {
  createAcademicSemester,
  getAcademicSemesters,
};
export default academicSemesterController;