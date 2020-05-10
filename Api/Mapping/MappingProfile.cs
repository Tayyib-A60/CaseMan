using Api.Controllers.DTOs;
using Api.Core.Models;
using AutoMapper;

namespace Api.Mapping {
    public class MappingProfile : Profile {
        public MappingProfile () {
            // Domain to API Resource
            CreateMap<Case, CaseToCreateDTO>();
            CreateMap<Case, CaseToReviewDTO>();
            CreateMap<User, UserDTO>();
            CreateMap<User, UserToReturn>();

            // API Resource to Domain            
            CreateMap<UserDTO, User>();
            CreateMap<UserToRegister, User>();
            CreateMap<CaseToCreateDTO, Case>();
            CreateMap<CaseToReviewDTO, Case>();

        }
    }
}