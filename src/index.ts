import getSecrets from './services'
import getArguments from "./utils/getArguments";



getSecrets(getArguments()).catch((err) => {
	if (err) {
		throw new Error(err)
	}
})
