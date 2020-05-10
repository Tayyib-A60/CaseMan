using Api.Controllers.DTOs;
using Api.Core.Models;
using Swashbuckle.AspNetCore.Filters;

namespace Api.SwaggerExamples.Requests
{
    public class CreateUserExampleRequest : IExamplesProvider<UserToRegister>
    {
        public UserToRegister GetExamples()
        {
            return new UserToRegister
            {
                Name = "Caseman Admin",
                Email = "admin@caseman.com",
                Password = "P@ssw0rd",
                Role = Role.Admin
            };
        }
    }
}