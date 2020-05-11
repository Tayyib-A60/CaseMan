using Api.Core.Models;
using Swashbuckle.AspNetCore.Filters;

namespace Api.SwaggerExamples.Responses
{
    public class GetCaseExampleResponse : IExamplesProvider<Case>
    {
        Case IExamplesProvider<Case>.GetExamples()
        {
            return new Case
            {
                CaseId = 15,
                UserId = 20,
                Title = "Title Case Example",
                Description = "Case Description",
                ReviewedByAdmin = true,
                AdminComment = "Treated"
            };
        }
    }
}