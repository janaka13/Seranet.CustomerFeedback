using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace CustomerFeedback.Models
{
    public class Appraisal
    {
        [Key]
        public int appraisal_id { get; set; }
        public int template_id { get; set; }
        public string project_name { get; set; }
        public int appraisal_year { get; set; }
        public string appraisal_type { get; set; }
        public string appraisal_status { get; set; }    //there are there status.not saved,not sbmitted,not submitted but saved
        public string customermail { get; set; }
        public string validate_key { get; set; }
        public int is_viewed { get; set; }

        public virtual Template template { get; set; }
    }
}