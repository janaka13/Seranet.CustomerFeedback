using Breeze.ContextProvider.EF6;
using CustomerFeedback.Filters;
using CustomerFeedback.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace CustomerFeedback.Controllers
{
    public class SendController : ApiController
    {

        readonly EFContextProvider<CustomerFeedbackDbContext> _contextProvider =
            new EFContextProvider<CustomerFeedbackDbContext>();

        [AuthUser]
        public string Post([FromBody] invalidateParams list)
        {
            if (list.state == "2")
            {
                invalidateAppraisal(Convert.ToInt32(list.appId));
            }
            else if (list.state == "1")
            {
                updateAppraisal(Convert.ToInt32(list.appId));
            }
            return "hitted";
        }

        public void invalidateAppraisal(int appId)
        {
            var appraisal = _contextProvider.Context.Appraisal.Find(appId);

            appraisal.appraisal_status = "0";

            _contextProvider.Context.SaveChanges();
        }

        public void updateAppraisal(int appId)
        {
            var appraisal = _contextProvider.Context.Appraisal.Find(appId);

            appraisal.appraisal_status = "2";

            _contextProvider.Context.SaveChanges();
        }

    }
}
