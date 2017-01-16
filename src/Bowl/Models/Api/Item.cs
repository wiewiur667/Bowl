using System;

namespace Bowl.Models.Api
{
    public class Item
    {
        public int Id { get; set; }

        public static Guid GenerateGUID()
        {
            var guid = Guid.NewGuid();
            return guid;
        }
    }
}
