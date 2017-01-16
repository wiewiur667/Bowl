using System.Collections.Generic;
namespace Bowl.Models.Api.Interfaces
{
    public interface IItem<T>
    {
        IEnumerable<T> Get();
        T Get(int id);
        T Save(T entity);
        bool Delete(int id);
    }
}
