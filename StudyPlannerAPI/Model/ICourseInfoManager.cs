using StudyPlannerAPI.Database.DTO;

namespace StudyPlannerAPI.Model;

public interface ICourseInfoManager
{
    Task<IList<CourseInfoDTO>> GetCourses(string programme, string year);

    Task<IList<CourseInfoDTO>> GetMasterCourses(string master, string programme, string year);
}