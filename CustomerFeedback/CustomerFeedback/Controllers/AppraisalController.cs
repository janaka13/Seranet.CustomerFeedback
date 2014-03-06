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
    public class AppraisalController : CustomerFeedbackDbController
    {
        //Handling Appraisals

        [HttpGet]
        [BreezeQueryable(MaxExpansionDepth = 3)]
        public IQueryable<Appraisal> Appraisals()
        {
            return _contextProvider.Context.Appraisal;
        }

        [HttpGet]
        public Appraisal Appraisal(int id)
        {
            return _contextProvider.Context.Appraisal.FirstOrDefault(a => a.appraisal_id == id);
        }

    }
}