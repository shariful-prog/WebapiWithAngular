using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderManagementGAKK.Generic
{
   public interface IGenRepository<T1> where T1 : class
    {
        Task<IEnumerable<T1>> GetAll(string userId);
        Task<T1> GetById(int id);
        Task<T1> Insert(T1 entity);
        Task UpdateAsync(T1 entity);
        Task<bool> DeleteAsync(int id);
        Task SaveAsync();

    }
}

