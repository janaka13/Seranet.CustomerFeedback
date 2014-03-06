using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CustomerFeedback.Models
{
    public class Criteria
    {
        [Key]
        public int criteria_id { get; set; }
        public string criteria_caption { get; set; }
        public string criteria_description { get; set; }
        public string rating_guide { get; set; }
        public int criteria_type { get; set; } // 1 for selecting criterias & 2 for commenting criterias

        //public virtual TemplateStructure template_structure{ get; set; }
        //public virtual ratings ratings{ get; set; }
        public virtual ICollection<TemplateStructure> templateStructures { get; set; }
    }
}