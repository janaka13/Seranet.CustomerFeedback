using System.Linq;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using Breeze.WebApi2;
using CustomerFeedback.Models;
using Breeze.ContextProvider.EF6;
using Breeze.ContextProvider;

namespace CustomerFeedback.Controllers
{
    [BreezeController]
    public class CriteriaController : CustomerFeedbackDbController
    {
        //Handling Criteria

        [HttpGet]
        public IQueryable<Criteria> Criterias()
        {
            return _contextProvider.Context.Criteria;
        }

        [HttpGet]
        public Criteria Criteria(int id)
        {
            return _contextProvider.Context.Criteria.FirstOrDefault(a => a.criteria_id == id);
        }

    }
}