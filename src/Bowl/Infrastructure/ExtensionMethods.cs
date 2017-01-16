using System.Reflection;

namespace Bowl.Data
{
    public static class ExtensionMethods
    {
        public static T UpdateEntity<T>(this T a, T b)
        {
            var aProperties = a.GetType().GetProperties();
            var bProperties = b.GetType().GetProperties();

            for (int i = 0; i < aProperties.Length; i++)
            {
                aProperties[i].SetValue(a, bProperties[i].GetValue(b));
            }

            return a;
        }
    }
}
