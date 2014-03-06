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
    public class TemplateStructureController : CustomerFeedbackDbController
    {
        //Handling TemplateStructures

        [HttpGet]
        public IQueryable<TemplateStructure> TemplateStructures()
        {
            return _contextProvider.Context.TemplateStructure;
        }

       

    }
}