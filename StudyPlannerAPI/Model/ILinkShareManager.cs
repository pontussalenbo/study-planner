﻿using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Database.DTO;

namespace StudyPlannerAPI.Model;

public interface ILinkShareManager
{
    Task<IActionResult> GetUniqueBlobFromPlan(string programme, string year,
        List<SelectedCourseDTO> selectedCourses, string studyPlanName, string uniqueBlob,
        List<CustomCourseDTO> customCourses);

    Task<IActionResult> GetPlanFromUniqueBlob(string uniqueBlob);
}