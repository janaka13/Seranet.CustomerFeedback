app.generateForm
    .directive('selectPopup', function ($compile) {
        return {
            restrict: 'E',
            template: '<select ng-model="cri.rating"  ng-options="rating.label for rating in rating_Guide" class="ratingDropDown btn" ng-change="stateIndicate()"><option style="display:none" value="">select one</option></select>',
            scope: false,
            link: function (scope, iElement, iAttrs, ctrl) {
                scope.rating_Guide = [];
                scope.$watch('Ratings', function () {
                    var guide = scope.cri.rating_guide;

                    rating_guide = [];
                    var a = guide.split(",");

                    for (var i = 0; i < a.length; i++) {
                        rating_guide[i] = { 'label': a[i], 'index': i + 1 };
                    }
                    scope.rating_Guide = rating_guide;
                    if (scope.cri.rating.index !== "" && scope.cri.rating.index !== -1) {
                        scope.cri.rating.label = scope.rating_Guide[parseInt(scope.cri.rating.index) - 1].label;
                        scope.cri.rating.index = scope.rating_Guide[parseInt(scope.cri.rating.index) - 1].index;
                        scope.cri.rating = scope.rating_Guide[parseInt(scope.cri.rating.index) - 1];
                    }
                    //scope.rating_Guide[parseInt(scope.cri.rating.index) - 1] = 
                });

            }
        };
    }).directive('commentPopup', function ($compile) {
        return {
            restrict: 'E',
            template: '<div id="{{ cri.criteria_id }}_{{ emp.employee_id }}" tabindex="-1" role="dialog" >\
                            <input type="text" ng-model="commentValue" placeholder="Any comments" //>\
                       </div>',
            scope: false
        };
    }).directive('commentInput', function ($compile) {
        return {
            restrict: 'E',
            template: '<div  id="{{ cri.criteria.criteria_id }}_{{ emp.employee_id }}" tabindex="-1" >\
                        <div class="modal-dialog">\
                            <div class="modal-content">\
                                <div class="modal-body">\
                                    <div>\
                                        <input type="text" data-toggle="modal" data-target="#{{ cri.criteria.criteria_id }}_{{ emp.employee_id }}" />\
                                        <comment-popup></comment-popup>\
	                                </div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>',
            scope: false
        };
    }).directive('popOver', function ($compile) {
        return {
            restrict: 'E',
            template: '<div id="{{ EmpEvaluation.employee_id }}_div">\
                           <div ng-switch-when="1">\
                            <a class="{{ EmpEvaluation.employee_id }}_btn" ><img src="img/compare.png" class="comp_img"></a>\
                            <div class="popover_content">\
                                <div id="{{ cri.criteria_id }}_title">{{ cri.criteria_caption }}</div>                                    \
                                <div id="{{ EmpEvaluation.employee_id }}_{{ cri.criteria_id }}_content">\
                                    <p ng-repeat="rate in compareArray">{{ rate.employee_name }} : {{ rate.rateValue }}</p>\
                                </div>\
                            </div>\
                        </div>\
                       </div>',
            scope: false,
            link: function (scope, iElement, iAttrs, ctrl) {                
                scope.$watch('popoverUpdate', function () {
                    scope.compareArray = [];
                    for (var d = 0; d < scope.Ratings.length; d++) {
                        for (var h = 0; h < scope.Ratings[d].rating.length; h++) {
                            if (scope.cri.criteria_id === scope.Ratings[d].rating[h].criteria_id) {
                                var rateLable = scope.Ratings[d].rating[h].rating.label;
                                var rateIndex = scope.Ratings[d].rating[h].rating.index;
                                if (typeof rateLable === 'undefined') {
                                    var rateGuide = scope.Ratings[d].rating[h].rating_guide;
                                    var guideArr = rateGuide.split(',');
                                    rateLable = guideArr[scope.Ratings[d].rating[h].rating.index - 1];
                                }
                                if (scope.Ratings[d].rating[h].rating.index === -1 || rateIndex === "") {
                                    rateLable = "Not rated yet";
                                }

                                scope.compareArray.push({
                                    'employee_name': scope.Ratings[d].employee_name,
                                    'rateValue': rateLable
                                });
                            }
                        }
                    }

                    $('.' + scope.EmpEvaluation.employee_id + '_btn').popover({
                        html: true,
                        trigger: 'hover',
                        title: function () {
                            var cric = parseInt(scope.cri.criteria_id) - 1;
                            return $('#' + cric + '_title').html();
                        },
                        content: function () {
                            var cric = parseInt(scope.cri.criteria_id) - 1;
                            return $('#' + scope.EmpEvaluation.employee_id + '_' + cric + '_content').html();
                        }
                    });

                });
            }
        };
    }).service('sharedProperties', function () {
        var formCells = [];

        return {
            getProperty: function () {
                return formCells;
            },
            setProperty: function (value) {
                formCells = value;
            }
        };
    });

//app.validateForm = angular.module('validateForm', []);