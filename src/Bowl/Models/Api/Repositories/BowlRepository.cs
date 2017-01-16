using Bowl.Data;
using Bowl.Models.Api.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bowl.Models.Api.Repositories
{
    public class BowlRepository : IBowl
    {

        DataDbContext _bowlContext;

        public BowlRepository(DataDbContext context)
        {
            _bowlContext = context;
        }

        public Bowl Get(int id)
        {
            return _bowlContext.Bowl
                //.Include(b => b.BowlMeals)
                .FirstOrDefault(b => b.Id == id);
        }

        public IEnumerable<Bowl> Get()
        {
            return _bowlContext.Bowl
                //.Include(a => a.BowlMeals)
                //.ThenInclude(b => b.Meal)
                .ToList();
        }

        public Bowl Save(Bowl entity)
        {
            Bowl bowl = null;
            if (entity.Id == 0)
            {
                bowl = _bowlContext.Bowl.Add(entity).Entity;
            }
            else
            {
                bowl = Get(entity.Id);
                if (bowl != null)
                {
                    bowl.UpdateEntity(entity);
                }
            }

            _bowlContext.SaveChanges();

            return bowl;
        }

        public bool Delete(int id)
        {
            var d = Get(id);
            if (_bowlContext.Bowl.Remove(d) != null)
            {
                _bowlContext.SaveChanges();
                return true;
            }

            return false;
        }

    }
}
