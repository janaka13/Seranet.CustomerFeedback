﻿using Breeze.ContextProvider.EF6;
using CustomerFeedback.Filters;
using CustomerFeedback.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace CustomerFeedback.Controllers
{
    public class CheckStatusController : ApiController
    {

        [AllowAnonymous]
        public string Post([FromBody] paramList list)
        {

            try
            {
                using (var db = new CustomerFeedbackDbContext())
                {

                    return db.Appraisal.Find(Convert.ToInt32(list.appId)).appraisal_status;

                }

            }
            catch (Exception e)
            {
                return "0";
            }

        }

    }
}