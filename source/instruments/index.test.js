//Core
import { sum, delay, getUniqueID } from './';

jest.setTimeout(10000);

describe('instruments', ()=>{
    test('sum function should be a function', ()=>{
        expect(sum).toBeInstanceOf(Function);
    });

    test('sum function should throw, when called with non-number type as second argument', ()=>{
        expect(()=>sum(2, 'Hi!' )).toThrow();
    });

    test('sum function should throw, when called with non-number type as first argument', ()=>{
        expect(()=>sum('Hi!', 2 )).toThrow();
    });

    test('sum function should return an addition of two arguments passed', ()=>{
        expect(sum(3, 2 )).toBe(5);
        expect(sum(1, 2 )).toMatchSnapshot();
    });

    test('delay function return a resolved promise', async ()=>{
        await expect( delay() ).resolves.toBeUndefined();
    });

    test('getUniqueID function should be a function',  ()=>{
        expect(getUniqueID).toBeInstanceOf(Function);
    });
    test('getUniqueID function should throw, when called with non-number type as first argument',  ()=>{
        expect( () => getUniqueID('hi')).toThrow();
    });
    test('getUniqueID function should produce a string of a desired give length',  ()=>{
        expect( typeof getUniqueID() ).toBe('string');
        expect( getUniqueID(5) ).toHaveLength(5);
        expect( getUniqueID(13) ).toHaveLength(13);
    });
});
