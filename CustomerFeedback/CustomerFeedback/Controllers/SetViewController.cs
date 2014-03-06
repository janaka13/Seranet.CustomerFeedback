using Breeze.ContextProvider.EF6;
using CustomerFeedback.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace CustomerFeedback.Controllers
{
    public class SetViewController : ApiController
    {

        readonly EFContextProvider<CustomerFeedbackDbContext> _contextProvider =
            new EFContextProvider<CustomerFeedbackDbContext>();

        public string Post([FromBody] paramList list)
        {
            setViewAppraisal(Convert.ToInt32(list.appId));
            return "hitted";
        }

        public void setViewAppraisal(int appId)
        {
            var appraisal = _contextProvider.Context.Appraisal.Find(appId);

            appraisal.is_viewed = 1;

            _contextProvider.Context.SaveChanges();
        }
    }
}