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
    public class RatingController : CustomerFeedbackDbController
    {
        //Handling Ratings

        [HttpGet]
        public IQueryable<Rating> Ratings()
        {
            return _contextProvider.Context.Rating;
        }

        [HttpGet]
        public Rating Rating(int id)
        {
            return _contextProvider.Context.Rating.FirstOrDefault(a => a.rating_Id == id);
        }
    }
}