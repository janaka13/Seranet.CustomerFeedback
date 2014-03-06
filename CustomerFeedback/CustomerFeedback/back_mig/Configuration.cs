namespace CustomerFeedback.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using CustomerFeedback.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<CustomerFeedback.Models.CustomerFeedbackDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(CustomerFeedback.Models.CustomerFeedbackDbContext context)
        {

            context.Appraisal.AddOrUpdate(a => a.appraisal_id, new Appraisal[]{
                
                new Appraisal(){appraisal_id = 1,template_id=1,project_name="project1",appraisal_year=2013,appraisal_type="mid",appraisal_status="1",validate_key="abc",customermail="abc@123"},
                new Appraisal(){appraisal_id = 2,template_id=1,project_name="project2",appraisal_year=2013,appraisal_type="end",appraisal_status="1",validate_key="abced",customermail="abcdd@123"}
            });

            context.Template.AddOrUpdate(a => a.template_id, new Template[] {                 
                new Template(){template_id = 1,template_caption = "first templete"},
                new Template(){template_id = 2,template_caption = "second templete"},
                new Template(){template_id = 3,template_caption = "third templete"} 
            });

            context.Criteria.AddOrUpdate(a => a.criteria_id, new Criteria[] { 
                new Criteria{criteria_id = 1,criteria_caption = "first criteria",criteria_description ="this is first criteria",rating_guide = "how much"}                        
            });

            context.TemplateStructure.AddOrUpdate(a => a.criteria_id, new TemplateStructure[]{
                new TemplateStructure{criteria_id = 1,template_id=1}
            });

            context.Evaluation.AddOrUpdate(a => a.evaluation_id, new Evaluation[] {
                new Evaluation{evaluation_id = 1,appraisal_id = 1,employee_id = 1,employee_name="shhhhhha"},
                new Evaluation{evaluation_id = 2,appraisal_id = 1,employee_id = 2,employee_name="abcd"}
            });

        }
    }
}
