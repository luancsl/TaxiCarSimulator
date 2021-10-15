import { Model, Q } from '@nozbe/watermelondb'
import { field, children, lazy, action, date, readonly } from '@nozbe/watermelondb/decorators'

export default class Draw extends Model {
    static table = 'draw'

    @field('type')
    type

    @field('bounds')
    bounds

    @date('created_at')
    created_at

    @date('updated_at')
    updated_at

    /* @action async addSpaceProfile(name, kc) {
        return await this.create(SpaceProfile => {
            SpaceProfile.name = name
            SpaceProfile.kc = kc
        })
    } */
}