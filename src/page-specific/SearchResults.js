import { Urls } from "@baltimorecounty/javascript-utilities";

const { GetParameterByName } = Urls;

const searchTerm = GetParameterByName("q");

console.log(searchTerm);
