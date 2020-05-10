using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Api.Core.Models;
using AutoMapper;
using Api.Core;
using Api.Controllers.DTOs;
using System.Collections.Generic;

namespace Api.Controllers {

    [ApiController]
    [Authorize]
    [Route ("/api/user")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public class UsersController : Controller {
        private IMapper _mapper { get; }
        private IUserRepository _repository { get; }
        public UsersController (IMapper mapper, IUserRepository repository) {
            _repository = repository;
            _mapper = mapper;
        }

        /// <summary>
        /// Allows for user to authenticate/login (Admin/Customer)
        /// </summary>
        /// <response code="200">Authenticates a user </response>
        /// <response code="400">Unable to authenticate user due to validation error(s)</response>
        [AllowAnonymous]
        [HttpPost ("authenticate")]
        [ProducesResponseType(typeof(UserWithToken), 200)]
        public IActionResult Authenticate ([FromBody] UserToLogin userToLogin) {
            if (!ModelState.IsValid)
                return BadRequest (ModelState);
            
            var user = _repository.Authenticate (userToLogin);

            if (user == null)
                return BadRequest("Incorrect combination of email and/or password");
            
            var tokenString = _repository.CreateToken(user);
            var userWithToken = new UserWithToken {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Token = tokenString,
                Role = user.Role.ToString()
            };
            return Ok (userWithToken);
        }       

        /// <summary>
        /// Allows for the creation of a new user account (Admin/Customer)
        /// </summary>
        /// <response code="200">Creates a new user</response>
        /// <response code="400">Unable to create user due to validation error(s)</response>
        [AllowAnonymous]
        [HttpPost ("register")]
        public async Task<IActionResult> Register ([FromBody] UserToRegister userToRegister)
        {
            if (!ModelState.IsValid)
                return BadRequest (ModelState);

            var user = _mapper.Map<User> (userToRegister);
            if (await _repository.UserExists (user))
                return BadRequest ("User already exists");
            user.EmailVerified = false;
            try {
                _repository.CreateUser (user, userToRegister.Password);
                var message = new Message {
                    FromName = "CaseMan",
                    FromEmail = "noreply@caseman.com",
                    ToName = user.Name,
                    ToEmail = user.Email,
                    Subject = "Account Creation",
                    HtmlContent = "Your account was created successfully"
                };
                _repository.SendEmail(message);
                await _repository.SaveAllChanges();
                return Ok ();
            } catch (Exception ex) {
                return BadRequest (ex.Message);
            }
        }
    }
}