using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Api.Core.Models;
using AutoMapper;
using Api.Core;
using Api.Extensions;
using Api.Controllers.DTOs;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;

namespace Api.Controllers
{
    [Authorize]
    [Route("/api/caseman")]
    [ApiController]
    [Consumes("application/json")]
    [Produces("application/json")]
    public class CaseManController : Controller
    {
        private IMapper _mapper { get; }
        private IUserRepository _userRepository { get; }
        private AppSettings _appSettings { get; }
        private ICaseManRepository _casemanRepository { get; }
        public CaseManController(IMapper mapper, IUserRepository userRepository, IOptions<AppSettings> appSettings, ICaseManRepository casemanRepository)
        {
            _casemanRepository = casemanRepository;
            _appSettings = appSettings.Value;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        /// <summary>
        /// Allows Customer/Admin to Log a new case
        /// </summary>
        /// <response code="200">Creates a case</response>
        /// <response code="400">Unable to create case due to validation error</response>
        /// <response code="401">Unauthorized access</response>
        [HttpPost("createCase")]
        public async Task<IActionResult> CreateCase([FromBody] CaseToCreateDTO caseDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest (ModelState);
            
            if ((caseDTO.UserId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) || (User.FindFirst(ClaimTypes.Role).Value != Role.Customer.ToString())) {
                return Unauthorized();
            }
            
            var customerCase = _mapper.Map<Case>(caseDTO);
            customerCase.ReviewedByAdmin = false;
            customerCase.AdminComment = null;
            _casemanRepository.Add(customerCase);
            await _casemanRepository.SaveAllChanges();
            return Ok();
        }


        /// <summary>
        /// Allows Admin to update a case
        /// </summary>
        /// <response code="200">Updates a case</response>
        /// <response code="400">Unable to update case due to validation error</response>
        /// <response code="401">Unauthorized access (Only an admin user is allowed to update the case)</response>
        [HttpPost("reviewCase/{userId}")]
        public async Task<IActionResult> ReviewCase(int userId, [FromBody] CaseToReviewDTO caseDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest (ModelState);

            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value) || User.FindFirst(ClaimTypes.Role).Value != Role.Admin.ToString()) {
                return Unauthorized();
            }
            var customerCase = _mapper.Map<Case>(caseDTO);
            customerCase.ReviewedByAdmin = true;

            _casemanRepository.Update(customerCase);
            await _casemanRepository.SaveAllChanges();
            return Ok(customerCase);
        }


        /// <summary>
        /// Allows Customer/Admin to retrieve a particular case
        /// </summary>
        /// <response code="200">Retrieves a particular case</response>
        /// <response code="400">Unable to retrieve case due to validation error</response>
        /// <response code="401">Unauthorized access</response>
        [HttpGet("getCase/{userId}/{caseId}")]
        [ProducesResponseType(typeof(Case), 200)]
        public async Task<IActionResult> GetCase(int userId, int caseId)
        {
            if ((userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))) {
                return Unauthorized();
            }

            bool isAdmin = false;

            if(User.FindFirst(ClaimTypes.Role).Value == Role.Admin.ToString()) {
                isAdmin = true;
            }

            var customerCase = await _casemanRepository.GetCase(isAdmin, userId, caseId);
            if(customerCase == null) return NotFound("Case not found");
            return Ok(customerCase);
        }
        
        /// <summary>
        /// Allows a Customer to retrieve cases logged by him/Admin to retrieve all cases
        /// </summary>
        /// <response code="200">Retrieves cases</response>
        /// <response code="400">Unable to retrieve cases due to validation error</response>
        /// <response code="401">Unauthorized access</response>
        [HttpGet("getCases/{userId}")]
        [ProducesResponseType(typeof(List<Case>), 200)]
        public async Task<IActionResult> GetCases(int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) {
                return Unauthorized();
            }

            bool isAdmin = false;

            if(User.FindFirst(ClaimTypes.Role).Value == Role.Admin.ToString()) {
                isAdmin = true;
            }
        
            var cases = await _casemanRepository.GetCases(isAdmin, userId);
            return Ok(cases);
        }

        /// <summary>
        /// Allows a Customer/Admin to delete a particular case
        /// </summary>
        /// <response code="200">Delete a particular case</response>
        /// <response code="401">Unauthorized access</response>
        [AllowAnonymous]
        [HttpDelete("removeCase/{userId}/{caseId}")]
        public async Task<IActionResult> RemoveCase(int userId, int caseId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) {
                return Unauthorized();
            }

            bool isAdmin = false;

            if(User.FindFirst(ClaimTypes.Role).Value == Role.Admin.ToString()) {
                isAdmin = true;
            }

            var caseToDelete = await _casemanRepository.GetCase(isAdmin, userId, caseId);

            _casemanRepository.Remove(caseToDelete);
            await _casemanRepository.SaveAllChanges();

            return Ok(caseId);
        }
    }
}
