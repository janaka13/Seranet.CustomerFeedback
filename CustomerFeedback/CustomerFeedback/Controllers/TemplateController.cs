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
    public class TemplateController : CustomerFeedbackDbController
    {

        //Handling Templates

        [HttpGet]
        public IQueryable<Template> Templates()
        {
            return _contextProvider.Context.Template;
        }

        [HttpGet]
        public Template Template(int id)
        {
            return _contextProvider.Context.Template.FirstOrDefault(a => a.template_id == id);
        }

    }
}