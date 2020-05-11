using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Models;

namespace Api.Core
{
    public interface ICaseManRepository
    {
        void Add<T>(T entity) where T: class;
        void Remove<T>(T entity) where T: class;
        void Update<T>(T entity) where T: class;
        Task<Case> GetCase(bool isAdmin, int userId, int caseId);
        Task<List<Case>> GetCases(bool isAdmin, int userId);
        Task<bool> SaveAllChanges();
    }
}