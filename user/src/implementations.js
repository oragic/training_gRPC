import User from './models/User'

export default{

    async getUserById(call, callback) {
        const { id } = call.request
        
        const user = await User.findById(id)

        return callback(null, { user })
    },
     
    async registerUser(call, callback) {
        const { email, username, password} = call.request

         const user = await User.create({email, username, password})

         return callback(null,{ user })
      },
     
    async loginUser(call, callback) {
        const { email, password } = call.request

         const user = await User.findOne({ email })

         if (!user){
            return callback({ error: 'User not found'})
         }

         if(!await user.compareHash(password)){
            return callback({ error: 'Invalid password' })
         }

         return callback(null,{
            token: User.generateToken(user)
         })


      },

}