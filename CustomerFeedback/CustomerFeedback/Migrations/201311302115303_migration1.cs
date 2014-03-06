namespace CustomerFeedback.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class migration1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Appraisals",
                c => new
                    {
                        appraisal_id = c.Int(nullable: false, identity: true),
                        template_id = c.Int(nullable: false),
                        project_name = c.String(),
                        appraisal_year = c.Int(nullable: false),
                        appraisal_type = c.String(),
                        appraisal_status = c.String(),
                        customermail = c.String(),
                        validate_key = c.String(),
                    })
                .PrimaryKey(t => t.appraisal_id)
                .ForeignKey("dbo.Templates", t => t.template_id, cascadeDelete: true)
                .Index(t => t.template_id);
            
            CreateTable(
                "dbo.Templates",
                c => new
                    {
                        template_id = c.Int(nullable: false, identity: true),
                        template_caption = c.String(),
                    })
                .PrimaryKey(t => t.template_id);
            
            CreateTable(
                "dbo.Criteria",
                c => new
                    {
                        criteria_id = c.Int(nullable: false, identity: true),
                        criteria_caption = c.String(),
                        criteria_description = c.String(),
                        rating_guide = c.String(),
                    })
                .PrimaryKey(t => t.criteria_id);
            
            CreateTable(
                "dbo.Evaluations",
                c => new
                    {
                        evaluation_id = c.Int(nullable: false, identity: true),
                        appraisal_id = c.Int(nullable: false),
                        employee_id = c.Int(nullable: false),
                        employee_name = c.String(),
                    })
                .PrimaryKey(t => t.evaluation_id)
                .ForeignKey("dbo.Appraisals", t => t.appraisal_id, cascadeDelete: true)
                .Index(t => t.appraisal_id);
            
            CreateTable(
                "dbo.Ratings",
                c => new
                    {
                        rating_Id = c.Int(nullable: false, identity: true),
                        evaluation_id = c.Int(nullable: false),
                        criteria_id = c.Int(nullable: false),
                        rating = c.Int(nullable: false),
                        comments = c.String(),
                    })
                .PrimaryKey(t => t.rating_Id)
                .ForeignKey("dbo.Criteria", t => t.criteria_id, cascadeDelete: true)
                .ForeignKey("dbo.Evaluations", t => t.evaluation_id, cascadeDelete: true)
                .Index(t => t.criteria_id)
                .Index(t => t.evaluation_id);
            
            CreateTable(
                "dbo.TemplateStructures",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        template_id = c.Int(nullable: false),
                        criteria_id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Criteria", t => t.criteria_id, cascadeDelete: true)
                .ForeignKey("dbo.Templates", t => t.template_id, cascadeDelete: true)
                .Index(t => t.criteria_id)
                .Index(t => t.template_id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.TemplateStructures", "template_id", "dbo.Templates");
            DropForeignKey("dbo.TemplateStructures", "criteria_id", "dbo.Criteria");
            DropForeignKey("dbo.Ratings", "evaluation_id", "dbo.Evaluations");
            DropForeignKey("dbo.Ratings", "criteria_id", "dbo.Criteria");
            DropForeignKey("dbo.Evaluations", "appraisal_id", "dbo.Appraisals");
            DropForeignKey("dbo.Appraisals", "template_id", "dbo.Templates");
            DropIndex("dbo.TemplateStructures", new[] { "template_id" });
            DropIndex("dbo.TemplateStructures", new[] { "criteria_id" });
            DropIndex("dbo.Ratings", new[] { "evaluation_id" });
            DropIndex("dbo.Ratings", new[] { "criteria_id" });
            DropIndex("dbo.Evaluations", new[] { "appraisal_id" });
            DropIndex("dbo.Appraisals", new[] { "template_id" });
            DropTable("dbo.TemplateStructures");
            DropTable("dbo.Ratings");
            DropTable("dbo.Evaluations");
            DropTable("dbo.Criteria");
            DropTable("dbo.Templates");
            DropTable("dbo.Appraisals");
        }
    }
}
