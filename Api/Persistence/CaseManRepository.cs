using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core;
using Api.Core.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Microsoft.Extensions.Configuration;
using System;

namespace Api.Persistence
{
    public class CaseManRepository : ICaseManRepository
    {
        private DataContext _context { get; }
        public IConfiguration _configuration { get; }

        public CaseManRepository(DataContext context, IConfiguration configuration) {
            _context = context;
            _configuration = configuration;
        }
        
        public async Task<Case> GetCase(bool isAdmin,int userId, int caseId)
        {
            var customerCase = new Case();
            if(isAdmin) {
                customerCase = await _context.Cases.FirstOrDefaultAsync(st => st.CaseId == caseId);
            }
            else {
                customerCase = await _context.Cases.FirstOrDefaultAsync(st => st.UserId == userId && st.CaseId == caseId);
            }
            return customerCase;
        }
        public async Task<IEnumerable<Case>> GetCases(bool isAdmin, int userId)
        {
            if(isAdmin) {
                return await _context.Cases.ToListAsync();
            } 
            else {
                return await _context.Cases.Where(st => st.UserId == userId)
                                             .ToListAsync();
            }
        }
        public void Add<T>(T entity) where T: class
        {
            _context.Entry(entity).State = EntityState.Added;
        }
        public void Remove<T>(T entity) where T: class
        {
            _context.Entry(entity).State = EntityState.Deleted;
        }
        public void Update<T>(T entity) where T: class
        {
            _context.Entry(entity).State = EntityState.Modified;
        }
        public async Task<bool> SaveAllChanges()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}