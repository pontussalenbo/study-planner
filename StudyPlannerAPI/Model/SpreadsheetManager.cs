using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using StudyPlannerAPI.Database.DTO;

namespace StudyPlannerAPI.Model;

public class SpreadsheetManager : ISpreadsheetManager
{
    private readonly ILinkShareManager linkShareManager;
    private readonly IMasterRequirementValidator masterRequirementValidator;
    private readonly ILogger<SpreadsheetManager> logger;

    public SpreadsheetManager(ILinkShareManager linkShareManager,
        IMasterRequirementValidator masterRequirementValidator, ILogger<SpreadsheetManager> logger)
    {
        this.linkShareManager = linkShareManager;
        this.masterRequirementValidator = masterRequirementValidator;
        this.logger = logger;
    }


    public async Task<MemoryStream> CreateSpreadsheetFromPlan(string programme, string year, List<string> masters,
        List<SelectedCourseDTO> courses, string name)
    {
        // Obtain master requirement results
        var masterReq =
            await masterRequirementValidator.ValidateCourseSelection(programme, year,
                courses.Select(c => c.course_code).ToList(), masters);

        // Obtain unique sharable link
        var uniqueBlob = (await linkShareManager.GetUniqueBlobFromPlan(programme, year, masters, courses, name))
            .StudyPlanId;

        // Format excel file w.r.t chosen year & periods
        var stream = FormatSheet(courses, masterReq, uniqueBlob);

        return stream;
    }

    private MemoryStream FormatSheet(List<SelectedCourseDTO> courses, List<MasterValidationResult> masterReq,
        string uniqueBlob)
    {
        var fourthYearCourses = courses.Where(c => c.study_year == 4).ToList();
        var fifthYearCourses = courses.Where(c => c.study_year == 5).ToList();

        // Format plan. Example:
        // study_year  | LP1 | LP2 | LP3 | LP4
        // course_code | --- |     |     |
        // course_code |     | --- |     |

        var stream = new MemoryStream();

        var workbook = new XSSFWorkbook();
        var boldFont = workbook.CreateFont();
        boldFont.Boldweight = (short)FontBoldWeight.Bold;

        var boldStyle = workbook.CreateCellStyle();
        boldStyle.SetFont(boldFont);


        var sheet = workbook.CreateSheet();
        var numCourses = courses.Count;
        var cell = sheet.CreateRow(0).CreateCell(0);
        cell.SetCellValue("Fourth Year");
        cell.CellStyle = boldStyle;
        for (var i = 0; i < numCourses; i++)
        {
            var row = sheet.CreateRow(i);
            row.CreateCell(0);
            row.Cells[0].SetCellValue(courses[i].course_code);
        }

        workbook.Write(stream);

        return stream;
    }
}