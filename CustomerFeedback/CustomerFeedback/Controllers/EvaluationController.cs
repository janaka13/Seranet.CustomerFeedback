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
    public class EvaluationController : CustomerFeedbackDbController
    {
        //Handling Evaluations

        [HttpGet]
        public IQueryable<Evaluation> Evaluations()
        {
            return _contextProvider.Context.Evaluation;
        }

        [HttpGet]
        public Evaluation Evaluation(int id)
        {
            return _contextProvider.Context.Evaluation.FirstOrDefault(a => a.evaluation_id == id);
        }

    }
}