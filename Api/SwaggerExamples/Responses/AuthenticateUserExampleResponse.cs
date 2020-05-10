using Api.Controllers.DTOs;
using Swashbuckle.AspNetCore.Filters;

namespace Api.SwaggerExamples.Responses
{
    public class AuthenticateUserExampleResponse : IExamplesProvider<UserWithToken>
    {
        public UserWithToken GetExamples()
        {
            return new UserWithToken
            {
                Id = 4,
                Name = "Toyeeb Adesokan",
                Email = "adesokantayyib@gmail.com",
                Token = "tokenString",
                Role = "Admin"
            };
        }
    }
}