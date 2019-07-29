using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace Mercury_Api.Database
{
    public class DatabaseService
    {

        public DatabaseService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

        }
    }
}