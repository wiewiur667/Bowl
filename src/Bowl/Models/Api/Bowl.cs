using System;
using System.Collections.Generic;

namespace Bowl.Models.Api
{
    public class Bowl : Item
    {
        public Guid Guid { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public string FoodName { get; set; }
        public decimal FoodAmount { get; set; }
        public decimal FoodAlert { get; set; }
        public bool Open { get; set; }
        public bool Distributing { get; set; }

        //Many to Many
        //public ICollection<BowlMeal> BowlMeals { get; set; }
        public static object getJsonBowl(Bowl bowl) => new
        {
            bowl.Id,
            bowl.Guid,
            bowl.Name,
            bowl.Location,
            bowl.FoodName,
            bowl.FoodAmount,
            bowl.FoodAlert
        };
    }
}
