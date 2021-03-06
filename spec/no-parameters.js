'use strict';

let sampleFile = `namespace Service.Filters.People
{
    public class WithCondition : IFilter<Dmn.Person, Permissions>
    {
        public WithCondition()
        {
        }

        public HttpStatusCode HasPermissions(Permissions permissions)
        {
            return HttpStatusCode.OK;
        }

        public IQueryable<Dmn.Person> Apply(IQueryable<Dmn.Person> query)
        {
            return query.Where(dmn => dmn.Condition);
        }
    }
}`;

let expectedOutput = `module app {
    'use strict';

    export class PeopleWithConditionFilter implements IFilter<Person> {
        constructor() {
        }

        public getFilterName(): string {
            return 'WithCondition';
        }

        public getParameters(): string[] {
            return [];
        }
    }
}`;

let typeScriptFilterGenerator = require('../index.js');

describe('typescript-filter-generator', function() {
    it('should transform a filter with zero parameters correctly', function() {
        let options = { module: 'app' };
        let result = typeScriptFilterGenerator(sampleFile, options);
        expect(result).toEqual(expectedOutput);
    });
});
