using StudyPlannerAPI.Database.DTO;

namespace StudyPlannerAPI.Model;

public interface ICourseInfoManager
{
    Task<IList<CourseInfoDTO>> GetCourses(string programme, string classYear, string academicYear);

    Task<IList<CourseInfoDTO>> GetMasterCourses(string master, string programme, string classYear, string academicYear);
}