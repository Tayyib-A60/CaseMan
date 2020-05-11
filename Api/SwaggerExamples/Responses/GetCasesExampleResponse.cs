using System.Collections.Generic;
using Api.Core.Models;
using Swashbuckle.AspNetCore.Filters;

namespace Api.SwaggerExamples.Responses
{
    public class GetCasesExampleResponse : IExamplesProvider<List<Case>>
    {
        List<Case> IExamplesProvider<List<Case>>.GetExamples()
        {
            var cases = new List<Case>();

            cases.Add(new Case
            {
                CaseId = 15,
                UserId = 20,
                Title = "Title Case Example",
                Description = "Case Description",
                ReviewedByAdmin = true,
                AdminComment = "Treated"
            });
            
            cases.Add(new Case
            {
                CaseId = 16,
                UserId = 20,
                Title = "Title Case Example 2",
                Description = "Case Description 2",
                ReviewedByAdmin = false,
                AdminComment = ""
            });

            return cases;
        }
    }
}