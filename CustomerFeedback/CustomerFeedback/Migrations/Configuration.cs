namespace CustomerFeedback.Migrations
{
    using CustomerFeedback.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<CustomerFeedback.Models.CustomerFeedbackDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(CustomerFeedback.Models.CustomerFeedbackDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            context.Appraisal.AddOrUpdate(a => a.appraisal_id, new Appraisal[]{
                
            });

            context.Template.AddOrUpdate(a => a.template_id, new Template[] {                 
                new Template(){template_id = 1,template_caption = "Team Member Appraisal"}
            });

            context.Criteria.AddOrUpdate(a => a.criteria_id, new Criteria[] { 
                new Criteria{criteria_id = 1,criteria_caption = "Quality of work",criteria_description ="this is third criteria",rating_guide = "1- To be improved, 2 - Below expectations, 3 - Meets expectations, 4 - Exceeds expectations, 5 - Is outstanding",criteria_type=1},
                new Criteria{criteria_id = 2,criteria_caption = "Communication skills",criteria_description ="this is forth criteria",rating_guide = "1- To be improved, 2 - Below expectations, 3 - Meets expectations, 4 - Exceeds expectations, 5 - Is outstanding",criteria_type=1},
                new Criteria{criteria_id = 3,criteria_caption = "Competency level",criteria_description ="this is fifth criteria",rating_guide = "1- To be improved, 2 - Below expectations, 3 - Meets expectations, 4 - Exceeds expectations, 5 - Is outstanding",criteria_type=1},
                new Criteria{criteria_id = 4,criteria_caption = "Responsiveness",criteria_description ="this is sixth criteria",rating_guide = "1- To be improved, 2 - Below expectations, 3 - Meets expectations, 4 - Exceeds expectations, 5 - Is outstanding",criteria_type=1},
                new Criteria{criteria_id = 5,criteria_caption = "Dependability",criteria_description ="this is next criteria",rating_guide = "1- To be improved, 2 - Below expectations, 3 - Meets expectations, 4 - Exceeds expectations, 5 - Is outstanding",criteria_type=1},
                new Criteria{criteria_id = 6,criteria_caption = "Areas for Improvement",criteria_description ="this is next next criteria",rating_guide = "1- To be improved, 2 - Below expectations, 3 - Meets expectations, 4 - Exceeds expectations, 5 - Is outstanding",criteria_type=2},
                new Criteria{criteria_id = 7,criteria_caption = "Any other comments",criteria_description ="this is final criteria",rating_guide = "1- To be improved, 2 - Below expectations, 3 - Meets expectations, 4 - Exceeds expectations, 5 - Is outstanding",criteria_type=2}
            });

            context.TemplateStructure.AddOrUpdate(a => a.criteria_id, new TemplateStructure[]{
                new TemplateStructure{Id = 1,criteria_id = 1,template_id=1},
                new TemplateStructure{Id = 2,criteria_id = 2,template_id=1},
                new TemplateStructure{Id = 3,criteria_id = 3,template_id=1},
                new TemplateStructure{Id = 4,criteria_id = 4,template_id=1},
                new TemplateStructure{Id = 5,criteria_id = 5,template_id=1},
                new TemplateStructure{Id = 6,criteria_id = 6,template_id=1},
                new TemplateStructure{Id = 7,criteria_id = 7,template_id=1}
            });

            context.Evaluation.AddOrUpdate(a => a.evaluation_id, new Evaluation[] {
            });

            context.Rating.AddOrUpdate(a => a.rating_Id, new Rating[]{
                
                
            });

            context.AdminUser.AddOrUpdate(a => a.id, new AdminUser[] { 
            
                new AdminUser(){id = 1,userName = "admin" ,password = "1000:huejsSw5y05NBekLszZTJbs/1ssxb+FY:EBhRjxHIg5Ky9NEU/VeYPaxaJlU6435E" ,userType = 1}
            });

        }

    }
}
