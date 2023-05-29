using StudyPlannerAPI.Database.DTO;

namespace StudyPlannerAPI.Model;

public interface ICourseInfoManager
{
    Task<IList<CourseDTO>> GetCourses(string programme, string year, string master);
}