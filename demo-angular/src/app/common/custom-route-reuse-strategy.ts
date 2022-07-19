import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

/**
 * 參考1: https://blog.kevinyang.net/2018/11/06/ng-RouteReuseStrategy/
 * 參考2: https://github.com/angular/angular/blob/11.0.5/packages/router/src/route_reuse_strategy.ts#L33-L60
 *
 * 除了 implements RouteReuseStrategy
 * 也可 extends BaseRouteReuseStrategy
 */

export class CustomRouteReuseStrategy implements RouteReuseStrategy {

  public static handlers: { [key: string]: DetachedRouteHandle } = {};

  constructor() {
    console.log('CustomRouteReuseStrategy created ...');
  }

  /**
   * Determines if a route should be reused.
   * This strategy returns `true` when the future route config and current route config are identical.
   * @param future
   * @param current
   */
  public shouldReuseRoute(future: ActivatedRouteSnapshot, current: ActivatedRouteSnapshot): boolean {
    const isReuseRoute = future.routeConfig === current.routeConfig;
    console.log(`█ future: ${this.getPath(future)} - current: ${this.getPath(current)} █ shouldReuseRoute:`, isReuseRoute)
    return isReuseRoute;
  }

  /**
   * Retrieves the previously stored route
   * @param route
   */
  public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    const handler = this.getHandler(route);
    console.log(`█ ${this.getPath(route)} █ retrieve:`, handler)
    return handler;
  }

  /**
   * Whether the given route should detach for later reuse.
   *
   * 當路由離開時，會觸發此方法
   *
   * @param route
   */
  public shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const isDetach = route.data['reuse'];
    console.log(`█ ${this.getPath(route)} █ shouldDetach:`, isDetach);
    return isDetach;
  }

  /**
   * Stores the detached route.
   * Storing a `null` value should erase the previously stored value.
   *
   * if shouldDetach return true, then trigger this method
   *
   * @param route
   * @param handle
   */
  public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    CustomRouteReuseStrategy.handlers[route.routeConfig.path] = handle; // 將目前路由內容暫存起來
    console.log(`█ ${this.getPath(route)} █ store:`, this, CustomRouteReuseStrategy.handlers); // this 是 CustomRouteReuseStrategy 的實例, 但 handlers 是綁在 class CustomRouteReuseStrategy 的身上
  }

  /**
   * Determines if this route (and its subtree) should be reattached
   * Returns `false`, meaning the route (and its subtree) is never reattached
   * @param route
   */
  public shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const isAttach = !!route.routeConfig && !!CustomRouteReuseStrategy.handlers[route.routeConfig.path]
    console.log(`█ ${this.getPath(route)} █ shouldAttach:`, isAttach)
    return isAttach;
  }

  // ========================================================================
  // =============================== helper =================================
  // ========================================================================

  private getPath(route: ActivatedRouteSnapshot): string {
    return route.routeConfig?.path;
  }

  private getHandler(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    if (!route.routeConfig) {
      return null;
    }
    return CustomRouteReuseStrategy.handlers[route.routeConfig.path];
  }
}
